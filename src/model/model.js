import { model } from "mongoose";
import userSchema from "../schema/userSchema.js";
import productSchema from "../schema/productSchema.js";
import reviewSchema from "../schema/reviewSchema.js";

export let User = model("User", userSchema);
export let Product = model("Product", productSchema);
export let Review = model("Review", reviewSchema);
