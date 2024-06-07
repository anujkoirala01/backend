import { model } from "mongoose";
import fileSchema from "../schema/fileSchema.js";
import productSchema from "../schema/productSchema.js";
import reviewSchema from "../schema/reviewSchema.js";
import webUserSchema from "../schema/webUserSchema.js";

export let Product = model("Product", productSchema);
export let Review = model("Review", reviewSchema);
export let File = model("File", fileSchema);
export let WebUser = model("WebUser", webUserSchema);
