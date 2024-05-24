import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  readProduct,
  readProductById,
} from "../controller/productController.js";

let productRouter = Router();

productRouter.route("/").post(createProduct).get(readProduct);

productRouter.route("/:productsId").delete(deleteProduct).get(readProductById);

export default productRouter;
