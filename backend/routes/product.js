import express from "express";
import { deleteProducts, getProducts, getProductsDetails, uptadeProducts } from "../controller/productController.js";

const router = express.Router()

router.get("/products",getProducts)
router.get("/products/:id",getProductsDetails)
router.put("/products/:id",uptadeProducts)
router.delete("/products/:id",deleteProducts)

export default router