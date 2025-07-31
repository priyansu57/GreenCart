import { Address } from "../models/Address.js";

export const addAddress = async (req , res ) => {
    try {
        
        const {address , user} = req.body;
        // console.log("address user :" , user);
        
        await Address.create({...address , user})
      return  res.json({success: true , message : "Address added successfully !!"}) 

    } catch (error) {
        console.log(error.message);
      return  res.json({success : false , message : error.message})
    }
}

export const getAddress = async (req , res ) => {
    try {
        
        const { userId} = req.query;
        //  console.log("address user :" , userId);
       const address =  await Address.find({userId});
       return res.json({success: true , address}) 

    } catch (error) {
        console.log(error.message);
        res.json({success : false , message : error.message})
    }
}