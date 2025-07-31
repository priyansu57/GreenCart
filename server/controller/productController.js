import {v2 as cloudinary} from "cloudinary"
import {Product}  from "../models/product.js"

export const addProduct = async (req , res) => {
    try {
        
        let productData = JSON.parse(req.body.productData);
        const images = req.files;

        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result =  await cloudinary.uploader.upload(item.path , {resource_type : 'image'});
                  return  result.secure_url 
            })
        )
 
        // await productData.create({...productData , image: imageUrl})
        await Product.create({ ...productData, image: imageUrl });
       
       return res.json({success: true  , message: "Product Added"})

    } catch (error) {
        console.log(error.message);
        res.json({success:true , message: error.message})
    }
}

export const ProductList = async(req,res) => {
    try { 
        const product = await Product.find({});
        console.log("cheker :" , product);
        
        return res.json({success: true , product  , message: "hello "})
    } catch (error) {
        console.log(error.message);
        res.json({success:true , message: error.message})
    }
}


export const productById = async (req,res) => {
    try {
        const {id} = req.body;
        const product = await Product.findById(id);
       return res.json({success: true , product})
    } catch (error) {
        console.log(error.message);
        res.json({success:true , message: error.message})
    }
}

export const changeStock = async (req,res) => {
    try{
        const {id ,inStock } = req.body;
        const product = await Product.findByIdAndUpdate(id , {inStock});
        return res.json({success: true , product})
    }catch (error) {
         console.log(error.message);
        res.json({success:true , message: error.message})
    }
}

