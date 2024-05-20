import express, { json } from "express";
import connectToMongoDB from "./src/connectToDB/connectToMongoDB.js";
import userRouter from "./src/router/userRouter.js";

let expressApp = express();
expressApp.use(json());
expressApp.listen(8000, () => {
  console.log("App is listening on port 8000");
});

connectToMongoDB();


expressApp.use("/users", userRouter);
