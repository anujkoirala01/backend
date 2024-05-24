import { Router } from "express";
import {
  createReview,
  deleteReview,
  readReview,
  readReviewById,
} from "../controller/reviewController";

let reviewRouter = Router();

reviewRouter.route("/").post(createReview).get(readReview);

reviewRouter.route("/:reviewsId").delete(deleteReview).get(readReviewById);

export default reviewRouter;
