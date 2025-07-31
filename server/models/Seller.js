import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
     password:{
        type:Object, 
        default: {}
     }
},{minimize: false})

const Seller = mongoose.model.Seller || mongoose.model('Seller' , userSchema);

export default Seller
