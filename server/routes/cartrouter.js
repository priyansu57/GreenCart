import express from "express"
import { authUser } from "../middleware/authUser.js";
import { UpdateCart } from "../controller/Cartcolntroller.js";

export const Cartrouter  = express.Router(); 

Cartrouter.post("/update" , authUser , UpdateCart)