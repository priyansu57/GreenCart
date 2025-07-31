import React, { useState } from "react";
import { useAppcontext } from "../../context/AppContext";
import { assets } from "../../assets/assets";


export const ProductCard = ({product}) => {

    const {currency,addToCart, removeToCart , cartItems ,setSearchQuery,searchQuey,navigate } = useAppcontext();
//    console.log( "checker !!" ,  product);
   
//    console.log(product._id);
   
//    {product.image.map((value) => (setImage(value)))}


    return (
        <div onClick={() => {navigate(`/products/${product.category}/${product._id}`); scrollTo(0,0);}} className="border border-gray-500/20  rounded-md md:px-4 px-3 py-2 bg-white min-w-5 max-w-56  ">
            <div className="group cursor-pointer flex items-center justify-center px-2  ">
                  <img  className="group-hover:scale-105 transition max-w-26 md:max-w-36"  src={product.image[0]}  alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                          <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
                        ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                       {currency}{product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
                    </p>
                    <div onClick={(e) => e.stopPropagation()} className="text-primary">
                        { !cartItems[product._id] ? (
                            <button className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] 
                              rounded text-primary/60 font-medium cursor-pointer" onClick={() => addToCart(product._id)} >
                                <img src={assets.cart_icon} alt="cart Icon" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                <button onClick={() => removeToCart(product._id) } className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>       
    );
};