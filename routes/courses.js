const express = require("express");
//mergeParams:true passed from other routes routes
const router = express.Router({ mergeParams: true });

const coursesController = require("../controllers/courses.js");
const Courses = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");

router
  .route("/")
  .get(
    advancedResults(Courses, {
      path: "bootcamp",
      select: "name description"
    }),
    coursesController.getCourses
  )
  .post(coursesController.addCourse);
router
  .route("/:id")
  .get(coursesController.getCourse)
  .put(coursesController.updateCourse)
  .delete(coursesController.deleteCourse);

module.exports = router;
