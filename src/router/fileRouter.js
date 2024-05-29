import { Router } from "express";
import {
  createFile,
  createMultipleFile,
} from "../controller/fileController.js";
import upload from "../middleware/uploadFile.js";

let fileRouter = Router();

fileRouter.route("/single").post(upload.single("file"), createFile);

fileRouter.route("/multiple").post(upload.array("file"), createMultipleFile);

export default fileRouter;
