import { Review } from "../model/model.js";

export let createReview = async (req, res) => {
  let reviewData = req.body;
  try {
    let result = await Review.create(reviewData);
    res.json({
      success: true,
      message: "Review created successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readReview = async (req, res) => {
  try {
    let result = await Review.find({});
    res.json({
      success: true,
      message: "Review Read Successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let deleteReview = async (req, res) => {
  let reviewId = req.params.reviewsId;
  try {
    let result = await Review.findByIdAndDelete(reviewId);
    res.json({
      success: true,
      message: "Review deleted successfully.",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readReviewById = async (req, res) => {
  let reviewId = req.params.reviewsId;
  try {
    let result = await Review.findById(reviewId);
    res.json({
      success: true,
      message: "Review read successfully by ID",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
