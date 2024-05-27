import { Router } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  myProfile,
  readUser,
  readUserById,
  updateUser,
} from "../controller/userController.js";
import { verifyToken } from "../utils/token.js";
import { secretKey } from "../constant.js";
import { User } from "../model/model.js";

let userRouter = Router();

userRouter.route("/").post(createUser).get(readUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/my-profile").get(myProfile);

userRouter
  .route("/:usersId")
  .delete(deleteUser)
  .get(readUserById)
  .patch(updateUser);

export default userRouter;

/* 

 

*/
