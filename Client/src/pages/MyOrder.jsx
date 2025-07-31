import React, { useEffect, useState } from 'react'
import { useAppcontext } from '../context/AppContext';
import { dummyOrders } from '../assets/assets';

function MyOrder() {
    const [MyOrders , setMyorders] = useState([]);
    const{currency , user , axiosShortener} = useAppcontext();

    const fetchMyorders = async() => {
        try {
            //    console.log();
               
           const  userId = user.user._id
            const {data} =  await axiosShortener.get("/api/order/user" , {params : {userId : userId}});
           console.log(data);
           
            if(data.success){
                 setMyorders(data.orders);
                // console.log( "data" , data.orders);
                
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(user){
            fetchMyorders();
        }
    },[user])

    return (
        <div>
            <div>
                <p className='text-2xl font-medium uppercase'>My orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
            {MyOrders.length > 0 ? ( MyOrders.map((order , idx) => (
                <div key={idx} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 mt-10'>
                    <p className='flex justify-between md:items-center text-gray-400
                    md:font-normal max-md:flex-col'>
                        <span>OrderId : {order._id}</span>
                        <span>Payment : {order._id}</span>
                        <span>Total Amount : {currency}{order.amount}</span>
                    </p>
                 
                 {/* {console.log("order of cart :" , order.items[0].product.category)
                 } */}

                    {order.items ?  (order.items.map((item , idx) => (
                        <div key={idx} className={`relative bg-white text-gray-500/70 mb-2 mt-2 flex justify-between  ${order.items.length !== idx+1 && "border-b pb-2.5"}`}>
                            <div className='flex items-center  mb-4 md:mb-0'>
                                <div className='bg-primary/10 p-4 rounded-lg'>
                                    <img src={ item.product.image  ?  item.product.image[0] : "Image was not given ."} alt="cart-product" className='w-16 h-16'/>
                                </div>
                                <div className='ml-4'>
                                    <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                                    <p>Category : {item.product.category}</p>
                                </div>
                            </div>

                            <div className='text-gary flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                                <p>Quentity : {item.quantity || "1"}</p>
                                <p>Status : {order.stutes}</p>
                                <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p>PaymentType : {order.paymentType}</p>
                            </div>
                            <p className='text-primary text-lg font-medium'>
                                Amount:{currency}{item.product.offerPrice * 1}
                            </p>
                        </div>
                    )) ) : null} 
                     
                </div>
                
            ) )): null } 
           
        </div>
    )
}

export default MyOrder
