import { Order } from "../models/Order.js";
import { Product } from "../models/product.js";
import Stripe from "stripe"
import dotenv from "dotenv";
dotenv.config();


export const placeOrderCOD = async (req , res) => {
    try {
        
        const {userId , items , seller  , address} = req.body
        
   console.log("userId :" , userId);
        console.log("items", items);
        console.log("address" , address);

        if(!address || items.length == 0 ){
            return res.json ({success : false , message : "Invalid data !!"});
        }

        let amount = 0 ;
        let product ;
        for(let item of items){
             product = await Product.findById(item.product);
        
            if (!product) {
                return res.json({ success: false, message: "Product not found" });
            }
            amount += product.offerPrice * item.quantity;
        }
       
        // Add Tax charge (2%)
        // console.log(amount);
        

        amount += Math.floor(amount * 0.02);

        if(product.inStock){
                await Order.create({
                userId,
                items ,
                address,
                amount,
                paymentType: "COD",
                seller,
                isPaid : false
            });
        

            return res.send({success :true , message : "Order was Placed ."})
        }else{
            return res.send({success :false , message : "Product was Out of Stock ."})
        }
    } catch (error) {
          console.log(error);
        return res.send({success :false , message : error.message})
    }
}

// Place order Stripe : /api/order/stripe

// export const placeOrderStrpe = async (req , res) => {
//     try {
        
//         const {userId , items , seller  , address} = req.body
//         const {origin}  = req.headers;

//         console.log("userId :" , userId);
//         console.log("items", items);
//         console.log("address" , address);

//         if(!address || items.length == 0 ){
//             return res.json ({success : false , message : "Invalid data !!"});
//         }

//         let amount = 0 ;
//         let productData = []
       
//         for(let item of items){
//            let   product = await Product.findById(item.product);
//             productData.push({
//                 name : product.name,
//                 price: product.offerPrice,
//                 quantity: item.quantity,
//             })
           
//             if (!product) {
//                 return res.json({ success: false, message: "Product not found" });
//             }
//             amount += product.offerPrice * item.quantity;
//         }
       
//         // Add Tax charge (2%)
//         // console.log(amount);
        

//         amount += Math.floor(amount * 0.02);

//         if(product.inStock){
//              const order =  await Order.create({
//                 userId,
//                 items ,
//                 address,
//                 amount,
//                 paymentType: "Online",
//                 seller
//             });

//             console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY);

//             // Strpe Gateway Intialize 
//             const stripeInstanece = new Stripe(process.env.STRIPE_SECRET_KEY);

//             const line_items= productData.map((item) => {
//                 return {
//                     price_data : {
//                         currency: "usd",
//                         product_data: {
//                             name : item.name
//                         },
//                         unit_amount: Math.floor(item.price + item.price * 0.2) * 100 
//                     },
//                     quantity : item.quantity,
//                 }
//             })

//             const session = await stripeInstanece.checkout.sessions.create({
//                 line_items ,
//                 mode : "payment",
//                 success_url : `${origin}/loader?next=my-orders`,
//                 cancel_url: `${origin}/cart`,
//                 metadata : {
//                     orderId : order._id.toString(),
//                     userId,
//                 }
//             })


//             return res.send({success :true , url: session.url})
//         }else{
//             return res.send({success :false , message : "Product was Out of Stock ."})
//         }
//     } catch (error) {
//           console.log(error);
//         return res.send({success :false , message : error.message})
//     }
// }

export const placeOrderStrpe = async (req, res) => {
    try {
        const { userId, items, seller, address } = req.body;
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data !!" });
        }

        let amount = 0;
        let productData = [];
        let allInStock = true;

        for (let item of items) {
            const product = await Product.findById(item.product);
            if (!product || !product.inStock) {
                allInStock = false;
                break;
            }

            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });

            amount += product.offerPrice * item.quantity;
        }

        if (!allInStock) {
            return res.send({ success: false, message: "One or more products are out of stock." });
        }

        amount += Math.floor(amount * 0.02); // Add 2% tax

        const order = await Order.create({
            userId,
            items,
            address,
            amount,
            paymentType: "Online",
            seller,
            isPaid: true
        });

        const stripeInstanece = new Stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = productData.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) , // price with 20% tax in cents
                },
                quantity: item.quantity,
            }));


        const session = await stripeInstanece.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            },
        });

        return res.send({ success: true, url: session.url });

    } catch (error) {
        console.log(error);
        return res.send({ success: false, message: error.message });
    }
};


// Get Orders by User Id : /api/order/user

export const getUserOrders = async (req,res) => {

    try {
        
        const {userId} = req.query;
        const orders = await Order.find({ userId 
        }).populate("items.product address").sort({createdAt: -1});

        //  const orders = await Order.find({userId})

       
        console.log("orders" , orders);
        

       return res.json({success : true , orders})
    } catch (error) {
         console.log(error.message);
        res.send({success : true , message : error.message})
    }
}


// Get All  Orders (for seller / admin ) : /api/order/seller

export const getAllOrders = async (req,res) => {

    try {  
         const {seller} = req.query; 
         console.log("seller check :" , seller); 
        const orders = await Order.find({ seller : seller }).populate("items.product address").sort({createdAt: -1}) 
        console.log("orders :" + orders);
        
       return res.json({success : true , orders})
    } catch (error) {
         console.log(error.message);
       return res.json({success : false , message : error.message})
    }
}