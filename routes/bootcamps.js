const express = require("express");
const router = express.Router();

const bootcampController = require("../controllers/bootcapms.js");

const advancedResults = require("../middleware/advancedResults");
const Bootcamp = require("../models/Bootcamp");
//include other resource routers
const courseRouter = require("./courses.js");

//Re-route into other resource - pass this route
router.use("/:bootcampId/courses", courseRouter);

//bootcamp
router
  .route("/radius/:zipcode/:distance")
  .get(bootcampController.getBootcampsInRadius);
router.route("/:id/photo").put(bootcampController.bootcampPhotoUpload);
router
  .route("/")
  //pass middleware for advance results, sorting limit pagination thi stuff
  .get(advancedResults(Bootcamp, "courses"), bootcampController.getBootcamps)
  .post(bootcampController.createBootcamp);
router
  .route("/:id")
  .get(bootcampController.getBootcamp)
  .put(bootcampController.updateBootcamp)
  .delete(bootcampController.deleteBootcamp);

module.exports = router;
