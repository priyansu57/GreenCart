import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
        name: {
            type:String,
            require:true,
        },
        category:{
            type:String,
            require:true,
        },
        price: {
            type:Number,
            require:true,
        },
        offerPrice: {
            type:Number,
            require:true,
        },
        image: {
            type:Array,
            require:true,
        },
        description: {
            type:Array,
            require:true,
        },
        inStock: {
            type:Boolean,
            default:true,
        },
        seller: {
             type: String ,
           require: true , 
        }
} , {timestamps: true}) 

export const Product = mongoose.model("Product" , productSchema);

