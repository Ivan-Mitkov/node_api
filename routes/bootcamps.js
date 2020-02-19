const express = require("express");
const router = express.Router();

const bootcampController = require("../controllers/bootcapms.js");

const advancedResults = require("../middleware/advancedResults");
const Bootcamp = require("../models/Bootcamp");

//include other resource routers
//mergeParams:true passed from other routes routes
const courseRouter = require("./courses.js");
const reviewRouter = require("./reviews");

const { protect, authorize } = require("../middleware/auth");
//Re-route into other resource - pass this route
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

//bootcamp
router
  .route("/radius/:zipcode/:distance")
  .get(bootcampController.getBootcampsInRadius);
router
  .route("/:id/photo")
  .put(
    protect,
    authorize("publisher", "admin"),
    bootcampController.bootcampPhotoUpload
  );
router
  .route("/")
  //pass middleware for advance results, sorting limit pagination thi stuff
  .get(advancedResults(Bootcamp, "courses"), bootcampController.getBootcamps)
  .post(
    protect,
    authorize("publisher", "admin"),
    bootcampController.createBootcamp
  );
router
  .route("/:id")
  .get(bootcampController.getBootcamp)
  .put(
    protect,
    authorize("publisher", "admin"),
    bootcampController.updateBootcamp
  )
  .delete(
    protect,
    authorize("publisher", "admin"),
    bootcampController.deleteBootcamp
  );

module.exports = router;
