import { Schema } from "mongoose";

let productSchema = Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required."],
    },
    brand: {
      type: String,
      required: [true, "Brand is required."],
    },
    category: {
      type: String,
      required: [true, "Category field is required."],
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
    },
  },
  {
    timestamps: true,
  }
);

export default productSchema;
