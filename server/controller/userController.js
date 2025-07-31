
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { signToken } from "../Api/signToken.js";

 // Register User 
export const register = async (req , res) => {
    try {
        const{name , email , password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({success: false ,message : "name,email,password is not sended !!"})
        }
        const existingUser = await User.findOne({email})

        if(existingUser) {
            return res.json({success: false , message: 'User is already exist !!'})
        }
      
        const  hashedPassword = await bcrypt.hash(password,10)

        const user = new User ({
            name : name ,
            email : email,
            password : hashedPassword,
        })

       await user.save()
           .then(() => console.log("user was save in DB.")
           ).catch((e) => console.log("user was not save in DB.")
           )
      

       const token =  await signToken({ prop : user});    

      res.cookie("accessToken" , token , {
        httpOnly:true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 ,
      })
      return res.json({success: true , user: {email: user.email, name: user.name }})
    } catch (error) {
        console.log(error);
        res.json({success:false , message: error.message});
    }
}


export const Login = async(req,res) => {
 
   try {
     const{email , password} = req.body ;
     
     if(!email || !password){
            return res.res.json({success: false ,message : "name,email,password is not sended !!"})
        }
    const user = await User.findOne({email});

    if(!user) {
        return res.json({success: false , message: "user not exist ."})
    }

    const isMatch = await bcrypt.compare(password , user.password)

    if(!isMatch) {
        return res.json({success: false , message: "Invalid email or password."})
    }

     const token = await signToken({ prop : user});    
      
      res.cookie("accessToken" , token , {
        httpOnly:true,
        secure: process.env.NODE_ENV == 'production',
        sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 ,
      })
      return res.json({success: true , user: {email: user.email, name: user.name }})

   } catch (error) {
     console.log(error);
        res.json({success:false , message: error.message});
   }   
    
};

// Check Auth : /api/user/is-auth

 export const isAuth = async (req,res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password")
        return res.json({success: true , user})
    } catch (error) {
        console.log(error);
        res.json({success:false , message: error.message});
    }
 }

// Logout  user : /api/user

export const logout = async (req,res) => {
    try {
        
        res.clearCookie('accessToken' , {
            httpOnly:true,
             secure: process.env.NODE_ENV == 'production',
            sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 ,
        })
        return res.json({success: true , message: "Logged Out" })
    } catch (error) {
         console.log(error);
        res.json({success:false , message: error.message});
    }
}

