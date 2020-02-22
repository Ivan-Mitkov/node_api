const express = require("express");
//mergeParams:true passed from other routes routes
// bootcamps/:bootcampId/reviews
const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../middleware/auth");

const reviewsController = require("../controllers/reviews");
const Review = require("../models/Review");
const advancedResults = require("../middleware/advancedResults");

router
  .route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description"
    }),
    reviewsController.getReviews
  )
  .post(protect, authorize("user", "admin"), reviewsController.addReview);

router
  .route("/:id")
  .get(reviewsController.getReview)
  .put(protect, authorize("user", "admin"), reviewsController.updateReview)
  .delete(protect, authorize("user", "admin"), reviewsController.deleteReview);
module.exports = router;
