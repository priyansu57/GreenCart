import  express from "express"
import {upload} from "../config/Multer.js"
import { authSeller } from "../middleware/authSeller.js";
import { addProduct, changeStock, productById, ProductList } from "../controller/productController.js";

export const productRouter = express.Router();

productRouter.post("/add" , upload.array("images" , 6) , authSeller , addProduct);
productRouter.get("/list" , ProductList);
productRouter.get("/id" , productById);
productRouter.post("/stock" , authSeller , changeStock);