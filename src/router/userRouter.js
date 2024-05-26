import { Router } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
  readUser,
  readUserById,
  updateUser,
} from "../controller/userController.js";

let userRouter = Router();

userRouter.route("/").post(createUser).get(readUser);

userRouter.route("/login").post(loginUser);

userRouter
  .route("/:usersId")
  .delete(deleteUser)
  .get(readUserById)
  .patch(updateUser);

export default userRouter;

/* 

 

*/
