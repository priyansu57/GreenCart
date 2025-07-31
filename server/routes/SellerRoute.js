import { isAuth, Login, logout, register } from "../controller/SellerController.js";
import { authSeller } from "../middleware/authSeller.js";
import express from "express"

export const sellerRouter = express.Router();

sellerRouter.post("/register" , register);
sellerRouter.post('/login' , Login);
sellerRouter.post('/logout' , logout);
sellerRouter.get('/is-auth' , authSeller , isAuth);