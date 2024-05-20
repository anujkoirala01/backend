import mongoose from "mongoose";

let connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/firstDB");
    console.log("Application is connected to mongo DB successfully");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectToMongoDB;
