import express from "express"
import { RouterModified } from "../types"
import * as productController from "../controllers/productController"

const router:RouterModified = express.Router()

router.post("/allproducts",productController.getAllProducts)

router.get("/specificproduct/:id",productController.searchProduct )

export default router