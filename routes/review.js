const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isReviewOwner } = require("../middleware");


const reviewController = require("../controllers/reviews");

//revews
//review route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);
//delete review route
router.delete(
  "/:reviewId",
  isLoggedIn, 
  isReviewOwner,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;