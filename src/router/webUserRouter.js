import { Router } from "express";
import {
  createWebUser,
  deleteWebUserById,
  loginWebUser,
  myProfile,
  readAllWebUser,
  readWebUserById,
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

webUserRouter
  .route("/:id")
  .get(readWebUserById)
  .patch(updateWebUserById)
  .delete(deleteWebUserById);

export default webUserRouter;

/* 

 

*/
