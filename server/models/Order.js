
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema ({
    userId : {
        type: String ,
        require: true , 
        ref : "User"
    },
    items : [{
         product: {
        type: String ,
        require: true , 
        ref : "Product"
    },
     quantity: {
        type:Number , require: true
    }
    }],
    seller :{
        type : String , require : true
    },
    amount : {type : String , require : true},
    address : {type : String , require : true , ref : "Address"},
    stutes : {type : String , require : true , default : "Order Placed"},
    paymentType : {type : String , require : true },
    isPaid : {type : Boolean , require : true }
} , {timestamps : true});

export const Order = mongoose.model("Order" , orderSchema);