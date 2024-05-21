import { Router } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  readUser,
} from "../controller/userController.js";

let userRouter = Router();

userRouter.route("/").post(createUser).get(readUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/:usersId").delete(deleteUser);

export default userRouter;

/* 

 

*/
