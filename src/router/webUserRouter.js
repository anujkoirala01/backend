import { Router } from "express";
import {
  createWebUser,
  deleteWebUser,
  loginWebUser,
  myProfile,
  readWebUser,
  readWebUserById,
  updateWebUser,
  verifyEmail,
} from "../controller/webUserController.js";

let webUserRouter = Router();

webUserRouter.route("/").post(createWebUser).get(readWebUser);

webUserRouter.route("/verify-email").patch(verifyEmail);

webUserRouter.route("/login").post(loginWebUser);

webUserRouter.route("/my-profile").get(myProfile);

webUserRouter
  .route("/:webUsersId")
  .delete(deleteWebUser)
  .get(readWebUserById)
  .patch(updateWebUser);

export default webUserRouter;

/* 

 

*/
