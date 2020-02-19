const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");

const usersController = require("../controllers/users.js");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

//We need protect and authorize for all routes here
router.use(protect);
router.use(authorize("admin"));

router
  .route("/")
  .get(advancedResults(User), usersController.getUsers)
  .post(usersController.createUser);

router
  .route("/:id")
  .get(usersController.getUser)
  .post(usersController.updateUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
