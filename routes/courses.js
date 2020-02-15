const express = require("express");
//mergeParams:true passed from other routes routes
const router = express.Router({ mergeParams: true });

const coursesController = require("../controllers/courses.js");

router
  .route("/")
  .get(coursesController.getCourses)
  .post(coursesController.addCourse);
router
  .route("/:id")
  .get(coursesController.getCourse)
  .put(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
