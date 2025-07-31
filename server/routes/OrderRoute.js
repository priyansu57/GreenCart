
import express from "express"
import { authUser } from "../middleware/authUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStrpe } from "../controller/orderController.js";
import { authSeller } from "../middleware/authSeller.js";

export const orderRouter = express.Router();

orderRouter.post("/cod" , authUser , placeOrderCOD);
orderRouter.get("/user" , authUser , getUserOrders);
orderRouter.get("/seller" , authSeller , getAllOrders);
orderRouter.post("/stripe" , authUser , placeOrderStrpe);