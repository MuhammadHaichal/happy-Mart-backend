import express from "express"
import body_parser from "body-parser"
import file_upload from "express-fileupload"
import Verification from "../middleware/verification.js"
import IndexProduct from '../controller/product/indexProduct.js'
import AddProduct from '../controller/product/addProduct.js'
import DeleteProduct from '../controller/product/deleteProduct.js'
import UpdateProduct from '../controller/product/updateProduct.js'

const productRouter = express.Router()
const bodyParser = body_parser.json()


productRouter.get("/index", IndexProduct)
productRouter.post("/createProduct", AddProduct)
productRouter.delete("/deleteProduct/:idProduct", DeleteProduct)
productRouter.patch("/updateProduct/:idProduct", UpdateProduct)


export default productRouter
