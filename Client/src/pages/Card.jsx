import { useEffect, useState } from "react"
import { useAppcontext } from "../context/AppContext"
import { assets, dummyAddress } from "../assets/assets";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Cart = () => {
    const [showAddress, setShowAddress] = useState(false);
    const [cartArray , setCartArray] = useState([]);
    const [address , setAddress] = useState([]);
    const [selectedAddress , setSelectedAddress] = useState(null);
    const [paymentOPtion , setPaymentOption] = useState("COD");

    const {product,getCardCount,axiosShortener ,currency,updateToCart,removeToCart,getCartAmount,cartItems, setcartItems,navigate,user,seller} = useAppcontext();
    console.log("cartItem in cart " , cartItems);
   

    const getCart = () => {
        let helloArry = [];
        for (const key in cartItems){
            const foundProduct= product.find((item) => item._id === key);
             foundProduct.quantity = cartItems[key]
            helloArry.push(foundProduct);
        }
        setCartArray(helloArry);
    }

    const getuserAddress = async () => {
        try {
            //  console.log("addew :" , user.user._id);
            const  userId = user.user._id
            const { data } = await axiosShortener.get("/api/address/get", { params : {userId : userId}})
         if (!data) {
                toast.error("No data returned from server.");
                return;
            }
            //  console.log("data of addr :" , data);
            
           if(data.success){
            setAddress(data.address)
           if(data.address.length > 0){
            setSelectedAddress(data.address[0])
           }
           }else{
            toast.error("error happen !!")
           }
        } catch (error) {
           console.log(error.message)
        }
    }

    

    const changeProduct = (e) => {
        setCartArray(cartArray.push(e))
    }

    useEffect(() => {
        if(product.length > 0 && cartItems){
            getCart();
           
        }
       
    },[product,cartItems])

    useEffect (() => {
    if(user){
       getuserAddress();
    }
    },[cartArray , user ,cartItems]);

  const placeOrder = async() => {
    try {
        
        if(!selectedAddress){
            return toast.error("Please select an address");
        }
 
         if(!cartItems){
            return toast.error("Add Product's !!");
        }

        if(paymentOPtion === "COD"){
            
            const { data } = await axiosShortener.post("/api/order/cod" , {
                userId: user.user._id,
                items: cartArray.map((item) => ({product: item._id , quantity: item.quantity })) ,
                address : selectedAddress._id,
                seller : seller ,
            })

            console.log(" COD data :" , data);
             console.log("cartArray :" , cartArray );
             
            if(data.success){
                toast.success(data.message);
                // setcartItems({});
                 navigate("/my-orders")
            }else if (data.message == "Product was Out of Stock ."){
                toast.error(data.message);
                setcartItems({});
                navigate("/");
            }
             else{
                toast.error(data.message);
            }
        }else{
            // Place order with Stripe 
            const { data } = await axiosShortener.post("/api/order/stripe" , {
                userId: user.user._id,
                items: cartArray.map((item) => ({product: item._id , quantity: item.quantity })) ,
                address : selectedAddress._id,
                seller : seller ,
            })

            console.log(" COD data :" , data);
             console.log("cartArray :" , cartArray );
             
            if(data.success){
               window.location.replace(data.url)
            }else if (data.message == "Product was Out of Stock ."){
                toast.error(data.message);
                setcartItems({});
                navigate("/");
            }
             else{
                toast.error(data.message);
            }

        }

    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
  }

    console.log();
    
    return product.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCardCount()}</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={() => {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0);}} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight ||  "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select onChange={(e)  => updateToCart(product._id , Number(e.target.value)) } className='outline-none' value={cartItems[product._id]}>
                                            {Array(cartItems[product._id] > 9 ? cartItems[product._id] > 9 : 9 ).fill('').map((_, index) => (
                                                <option  key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => removeToCart(product._id)} className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon} alt="remove" className="inline-block w-6 h-6" />
                        </button>
                    </div>)
                )}

                <button onClick={() => {navigate("/products")}} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img src={assets.arrow_right_icon_colored} alt="arrow" className="group-hover:-translate-x-1 transition"/>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country} `: "No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                { address.map((address , idx) => (<p key={idx} onClick={() => {setShowAddress(false); setSelectedAddress(address)}} className="text-gray-500 p-2 hover:bg-gray-100">
                                    {address.street}, {address.city} , {address.state} , {address.country}
                                </p>)) }
                                <p onClick={() => navigate("/add-address")} className="text-primary text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={ e => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency} {(getCartAmount() / 100) *2 }</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{getCartAmount() + (getCartAmount() / 100) *2  }</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                   {paymentOPtion === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) : null
}

export default Cart