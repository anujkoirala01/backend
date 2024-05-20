import { Schema } from "mongoose";

const reviewSchema = Schema(
  {
    productId: {
      type: Schema.ObjectId,
      ref: "Product",
      required: [true, "productId field is required"],
      trim: true,
    },
    userId: {
      type: Schema.ObjectId,
      ref: "User",
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
