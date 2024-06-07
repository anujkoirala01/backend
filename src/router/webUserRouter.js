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
import isAuthorized from "../middleware/isAuthorized.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

let webUserRouter = Router();

webUserRouter
  .route("/")
  .post(createWebUser)
  .get(isAuthenticated, isAuthorized(["admin", "superadmin"]), readAllWebUser);

webUserRouter.route("/verify-email").patch(verifyEmail);

webUserRouter.route("/login").post(loginWebUser);

webUserRouter.route("/my-profile").get(isAuthenticated, myProfile);

webUserRouter.route("/update-profile").patch(isAuthenticated, updateProfile);

webUserRouter.route("/update-password").patch(isAuthenticated, updatePassword);

webUserRouter.route("/forgot-password").post(forgotPassword);

webUserRouter.route("/reset-password").patch(isAuthenticated, resetPassword);

webUserRouter
  .route("/:id")
  .get(isAuthenticated, isAuthorized(["admin", "superadmin"]), readWebUserById)
  .patch(
    isAuthenticated,
    isAuthorized(["admin", "superadmin"]),
    updateWebUserById
  )
  .delete(isAuthenticated, isAuthorized(["superadmin"]), deleteWebUserById);

export default webUserRouter;

/* 

 

*/
