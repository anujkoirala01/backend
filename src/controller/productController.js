import { Product } from "../model/model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const createProduct = catchAsync(async (req, res) => {
  const result = await Product.create(req.body);
  successResponse(res, 201, "Product updated successfully", result);
});

export const readProduct = catchAsync(async (req, res) => {
  const result = await Product.find({});
  successResponse(res, 200, "Product Read Successfully", result);
});

export const deleteProduct = catchAsync(async (req, res) => {
  const result = await Product.findByIdAndDelete(req.params.productsId);
  successResponse(res, 200, "Product deleted successfully.", result);
});

export const readProductById = catchAsync(async (req, res) => {
  const result = await Product.findById(req.params.productsId);
  successResponse(res, 200, "Product read successfully by ID", result);
});

export const updateProduct = catchAsync(async (req, res) => {
  const result = await Product.findByIdAndUpdate(
    req.params.productsId,
    req.body,
    { new: true }
  );
  successResponse(res, 201, "Product updated successfully", result);
});
