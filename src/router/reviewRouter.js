import { Router } from "express";
import {
  createReview,
  deleteReview,
  readReview,
  readReviewById,
  updateReview,
} from "../controller/reviewController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isAuthorized from "../middleware/isAuthorized.js";

let reviewRouter = Router();

reviewRouter
  .route("/")
  .post(isAuthenticated, isAuthorized(["customer"]), createReview)
  .get(readReview);

reviewRouter
  .route("/:reviewsId")
  .delete(isAuthenticated, isAuthorized(["superadmin"]), deleteReview)
  .get(readReviewById)
  .patch(isAuthenticated, isAuthorized(["customer"]), updateReview);

export default reviewRouter;
