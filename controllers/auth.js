const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async.js");

//@desk Register User
//@route GET /api/v1/auth/register
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
  res.status(200).json({ success: true,token });
});
