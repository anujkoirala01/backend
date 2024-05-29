import mongoose from "mongoose";
import { url } from "../constant.js";

let connectToMongoDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Application is connected to mongo DB successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToMongoDB;
