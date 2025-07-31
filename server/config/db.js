import mongoose from "mongoose";

const connectDB = async () => {
    try{
       mongoose.connection.on('connect' , () => {
        console.log("Connected to Database !!");
        
       })
       await mongoose.connect(`${process.env.MONGODB_URL}/greenCart`);

    }catch(error){
        console.error(error.message);
    }
}

 export default connectDB

