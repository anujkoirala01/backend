import { Router } from "express";
import {
  createWebUser,
  deleteWebUserById,
  forgotPassword,
  loginWebUser,
  myProfile,
  readAllWebUser,
  readWebUserById,
  resetPassword,
  updatePassword,
  updateProfile,
  updateWebUserById,
  verifyEmail,
} from "../controller/webUserController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

let webUserRouter = Router();

webUserRouter.route("/").post(createWebUser).get(readAllWebUser);

webUserRouter.route("/verify-email").patch(verifyEmail);

webUserRouter.route("/login").post(loginWebUser);

webUserRouter.route("/my-profile").get(isAuthenticated, myProfile);

webUserRouter.route("/update-profile").patch(isAuthenticated, updateProfile);

webUserRouter.route("/update-password").patch(isAuthenticated, updatePassword);

webUserRouter.route("/forgot-password").post(forgotPassword);

webUserRouter.route("/reset-password").post(isAuthenticated, resetPassword);

webUserRouter
  .route("/:id")
  .get(readWebUserById)
  .patch(updateWebUserById)
  .delete(deleteWebUserById);

export default webUserRouter;

/* 

 

*/
