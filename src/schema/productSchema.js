import { Schema } from "mongoose";

let productSchema = Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required."],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category field is required."],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity field is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default productSchema;
