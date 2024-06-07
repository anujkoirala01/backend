import { Schema } from "mongoose";

const reviewSchema = Schema(
  {
    webUserId: {
      type: Schema.ObjectId,
      ref: "WebUser",
      required: [true, "productId field is required"],
      trim: true,
    },
    productId: {
      type: Schema.ObjectId,
      ref: "Product",
      required: [true, "userId field is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "rating field is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description field is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default reviewSchema;
