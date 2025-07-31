
import express from "express"
import { authUser } from "../middleware/authUser.js";
import { addAddress, getAddress } from "../controller/AddressController.js";

export const addressRouter = express.Router();

addressRouter.post("/add" , authUser , addAddress);
addressRouter.get("/get" , authUser , getAddress);