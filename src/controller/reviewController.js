import successResponse from "../utils/successResponse.js";
import { Review } from "../model/model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createReview = catchAsync(async (req, res) => {
  const result = await Review.create(req.body);
  successResponse(res, 201, "Review created successfully", result);
});

export const readReview = catchAsync(async (req, res) => {
  const result = await Review.find({}).populate("reviewId", "name email -_id");
  successResponse(res, 200, "Review Read Successfully", result);
});

export const deleteReview = catchAsync(async (req, res) => {
  const result = await Review.findByIdAndDelete(req.params.reviewsId);
  successResponse(res, 200, "Review deleted successfully.", result);
});

export const readReviewById = catchAsync(async (req, res) => {
  const result = await Review.findById(req.params.reviewsId);
  successResponse(res, 200, "Review read successfully by ID", result);
});

export const updateReview = catchAsync(async (req, res) => {
  const result = await Review.findByIdAndUpdate(
    req.params.reviewsId,
    req.body,
    { new: true }
  );
  successResponse(res, 201, "Review updated successfully", result);
});
