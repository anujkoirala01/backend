import { Product } from "../model/model.js";


export let createProduct = async (req, res) => {
  let productData = req.body;
  try {
    let result = await Product.create(productData);
    res.json({
      success: true,
      message: "Product created successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readProduct = async (req, res) => {
  try {
    let result = await Product.find({});
    res.json({
      success: true,
      message: "Product Read Successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


export let deleteProduct = async (req, res) => {
  let productId = req.params.productsId;
  try {
    let result = await Product.findByIdAndDelete(productId);
    res.json({
      success: true,
      message: "Product deleted successfully.",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export let readProductById = async (req, res) => {
  let productId = req.params.productsId;
  try {
    let result = await Product.findById(productId);
    res.json({
      success: true,
      message: "Product read successfully by ID",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
