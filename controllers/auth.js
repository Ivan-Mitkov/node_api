const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");

//@desk Register User
//@route POST /api/v1/auth/register
//@access Public

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  //Create user
  const user = await User.create({
    name,
    email,
    password,
    role
  });
  sentTokenResponse(user, 200, res);
});

//@desk Login User
//@route POST /api/v1/auth/login
//@access Public

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validation email password
  //this data is not run through the model so we need other validation
  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }
  //Check for user
  //in User model select is false so we need to select it if we need password
  //https://mongoosejs.com/docs/api.html#query_Query-select
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //Check if password matches this in the DB
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sentTokenResponse(user, 200, res);
});
//@desk Get current Logged in User
//@route GET /api/v1/auth/me
//@access Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

//@desk Forgot password
//@route POST /api/v1/auth/forgotpassword
//@access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }
  //Get reset token
  const resetToken = user.getResetPasswordToken();
  //Save user
  await user.save({ validateBeforeSave: false });
  res.status(200).json({ success: true, data: user });
});

//Get token from model, create cookie, send response
const sentTokenResponse = (user, statusCode, res) => {
  //Create JW token
  //lower case user user becuase we are using methods not statics
  const token = user.getSignedJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
// HttpOnly cookies are inaccessible to JavaScript's Document.cookie API;
// they are only sent to the server. For example, cookies that persist server-side sessions
// don't need to be available to JavaScript, and the HttpOnly flag should be set.
