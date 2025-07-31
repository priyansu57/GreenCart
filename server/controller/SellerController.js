
import Seller from "../models/Seller.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { signToken } from "../Api/signToken.js";

 // Register User 
export const register = async (req , res) => {
    try {
        const{name , email , password} = req.body;
          console.log("name" ,name , "email" , email , "password" , password);
          
        if(!name || !email || !password){
            return res.status(400).json({success: false ,message : "name,email,password is not sended !!"})
        }
        const existingSeller = await Seller.findOne({email})

        if(existingSeller) {
            return res.json({success: false , message: 'Seller is already exist !!'})
        }
      
        const  hashedPassword = await bcrypt.hash(password,10)

        const seller = new Seller ({
            name : name ,
            email : email,
            password : hashedPassword,
        })

       await seller.save()
           .then(() => console.log("seller was save in DB.")
           ).catch((e) => console.log("seller was not save in DB.")
           )
      
           
       const token =  signToken({ prop : seller});    
      res.cookie("sellerToken" , token , {
        httpOnly:true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 ,
      })
      return res.json({success: true , seller: {email: seller.email, name: seller.name }})
    } catch (error) {
        console.log(error);
        res.json({success:false , message: error.message});
    }
}


export const Login = async(req,res) => {
 
   try {
     const{email , password} = req.body ;
     
     if(!email || !password){
            return res.status(400).res.json({success: false ,message : "name,email,password is not sended !!"})
        }
    const seller = await Seller.findOne({email});

    if(!seller) {
        return res.json({success: false , message: "user not exist ."})
    }

    const isMatch = await bcrypt.compare(password , seller.password)

    if(!isMatch) {
        return res.json({success: false , message: "Invalid email or password."})
    }

     const token =  signToken({ prop : seller});       
      res.cookie("sellerToken" , token , {
        httpOnly:true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 ,
      })
      return res.json({success: true , seller: {email: seller.email, name: seller.name }})

   } catch (error) {
     console.log(error);
        res.json({success:false , message: error.message});
   }   
    
};

// Check Auth : /api/user/is-auth

 export const isAuth = async (req,res) => {
    try {
        const sellerId = req.sellerId;
        const seller = await Seller.findById(sellerId).select("-password");

        if(!seller){
            return res.json({success: true , message : "Seller was not access !!"})
        }
        return res.json({success: true , seller})
    } catch (error) {
        console.log(error);
        res.json({success:false , message: error.message});
    }
 }

// Logout  user : /api/user

export const logout = async (req,res) => {
    try {
        res.clearCookie('sellerToken' , {
            httpOnly:true,
             secure: process.env.NODE_ENV == 'production',
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 ,
        })
        return res.json({success: true , message: "Logged Out"})
    } catch (error) {
         console.log(error);
        res.json({success:false , message: error.message});
    }
}

