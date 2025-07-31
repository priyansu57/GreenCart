import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import 'dotenv/config';
import { useRouter } from "./routes/useRoute.js";
import { sellerRouter } from "./routes/SellerRoute.js";
import { connectCloudinary } from "./config/cloudinary.js";
import { Cartrouter } from "./routes/cartrouter.js";
import { addressRouter } from "./routes/AddressRouter.js";
import { orderRouter } from "./routes/OrderRoute.js";
import { productRouter } from "./routes/ProductRouter.js";

const app = express();
const port = process.env.PORT || 4000;
const allowedOrigin = ['http://localhost:5173']

await connectDB()
 .then(() => console.log("connection successfull")
 )
 .catch((error) => console.log(error)
 );
 

await connectCloudinary(); 

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigin ,
     credentials: true ,
     methods: ['GET','POST' , 'DELETE' , 'PUT' , 'PATCH'],
}))

app.listen(port , () => {
    console.log("Port was listen on : " , port );   
});

app.get("/" , (req,res) => {
    res.send("app is running !!");
})

app.use("/api/user"  , useRouter);
app.use("/api/seller"  , sellerRouter);
app.use("/api/product"  , productRouter);
app.use("/api/cart"  , Cartrouter);
app.use("/api/address"  , addressRouter);
app.use("/api/order"  , orderRouter);