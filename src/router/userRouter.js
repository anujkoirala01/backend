import { Router } from "express";
import { createUser, readUser } from "../controller/userController.js";
import { User } from "../model/model.js";

let userRouter = Router();

userRouter.route("/").post(createUser).get(readUser);

export default userRouter;

/* 



*/
