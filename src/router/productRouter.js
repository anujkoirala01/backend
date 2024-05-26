import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  readProduct,
  readProductById,
  updateProduct,
} from "../controller/productController.js";

let productRouter = Router();

productRouter.route("/").post(createProduct).get(readProduct);

productRouter
  .route("/:productsId")
  .delete(deleteProduct)
  .get(readProductById)
  .patch(updateProduct);

export default productRouter;
