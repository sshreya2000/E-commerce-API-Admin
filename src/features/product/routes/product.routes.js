// imports
import express from "express";
import ProductController from "../controller/product.controller.js";

// 2. Initialize Express router.
const router = express.Router();
const productController = new ProductController();

// All the paths to the controller methods.
// localhost/api/products
router.post("/create", (req, res) => {
  productController.addProduct(req, res);
});
router.get("/", (req, res) => {
  productController.getProducts(req, res);
});
router.delete("/:id", (req, res) => {
  productController.deleteProduct(req, res);
});
router.put("/:id/update_quantity", (req, res) => {
  productController.updateProduct(req, res);
});
export default router;
