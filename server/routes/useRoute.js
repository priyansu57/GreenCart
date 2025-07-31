import express from  "express"
import { isAuth, Login, logout, register } from "../controller/userController.js";
import { authUser } from "../middleware/authUser.js";

export const useRouter = express.Router();

useRouter.post('/register' , register);
useRouter.post('/login' , Login);
useRouter.post('/logout' , logout);
useRouter.get('/is-auth' , authUser , isAuth);