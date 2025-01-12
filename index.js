import cors from "cors";
import express, { json } from "express";
import connectToMongoDB from "./src/connectToDB/connectToMongoDB.js";
import { port } from "./src/constant.js";
import fileRouter from "./src/router/fileRouter.js";
import productRouter from "./src/router/productRouter.js";
import reviewRouter from "./src/router/reviewRouter.js";
import webUserRouter from "./src/router/webUserRouter.js";

let expressApp = express();

expressApp.use(cors());

expressApp.use(json());

expressApp.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

expressApp.use(express.static("./public"));

connectToMongoDB();

expressApp.use("/products", productRouter);
expressApp.use("/reviews", reviewRouter);
expressApp.use("/files", fileRouter);
expressApp.use("/web-users", webUserRouter);
