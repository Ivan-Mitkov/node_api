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
  //Create JW token
  //lower case user user becuase we are using methods not statics
  const token = user.getSignedJWTToken();

  //paswword encryption in model
  res.status(200).json({ success: true, token });
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

  //Create JW token
  //lower case user user becuase we are using methods not statics
  const token = user.getSignedJWTToken();

  //paswword encryption in model
  res.status(200).json({ success: true, token });
});
