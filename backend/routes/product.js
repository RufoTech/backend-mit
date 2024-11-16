import express from "express";
import { deleteProducts, getProducts, getProductsDetails, newProduct, uptadeProducts } from "../controller/productController.js";

const router = express.Router()

router.get("/products",getProducts)
router.get("/products/:id",getProductsDetails)
router.put("/products/:id",uptadeProducts)
router.delete("/products/:id",deleteProducts)
router.post("/admin/products",newProduct)


export default router