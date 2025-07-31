import mongoose, { Types } from "mongoose";

const addressSchema = new  mongoose.Schema ({
 
    userId : {
        type: String , 
        require: true,
    },
    firstName : {
        type: String , 
        require: true,
    },
    lastName : {
        type: String , 
        require: true,
    },
    email: {
        type: String , 
        require: true,
    },
    street : {
        type: String , 
        require: true,
    },
    pincode :{
      type: Number , 
        require: true,
    },
    state : {
        type: String , 
        require: true,
    },
    city : {
        type: String , 
        require: true,
    },
    country : {
        type: String , 
        require: true,
    },
    phone : {
        type: String , 
        require: true,
    }
})

export const Address = mongoose.model("Address" , addressSchema)