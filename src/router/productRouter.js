import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  readProduct,
  readProductById,
  updateProduct,
} from "../controller/productController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isAuthorized from "../middleware/isAuthorized.js";

let productRouter = Router();

productRouter
  .route("/")
  .post(isAuthenticated, isAuthorized(["admin"]), createProduct)
  .get(readProduct);

productRouter
  .route("/:productsId")
  .delete(isAuthenticated, isAuthorized(["admin", "superadmin"]), deleteProduct)
  .get(readProductById)
  .patch(isAuthenticated, isAuthorized(["admin"]), updateProduct);

export default productRouter;
