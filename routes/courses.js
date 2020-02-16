const express = require("express");
//mergeParams:true passed from other routes routes
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/auth");

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
  .post(protect, coursesController.addCourse);
router
  .route("/:id")
  .get(coursesController.getCourse)
  .put(protect, coursesController.updateCourse)
  .delete(protect, coursesController.deleteCourse);

module.exports = router;
