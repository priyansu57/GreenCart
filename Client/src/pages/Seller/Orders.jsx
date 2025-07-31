import React, { useEffect, useState } from 'react'
import { useAppcontext } from '../../context/AppContext';
import { assets, dummyOrders } from '../../assets/assets';
import toast from 'react-hot-toast';

function Orders() {
 
   const{currency,axiosShortener ,seller} = useAppcontext();
   const[orders , setOrders] = useState([])

   const fetchOrder = async() => {
     try {
        const {data} = await axiosShortener.get("/api/order/seller" , {params: {seller : seller}} );
        
        console.log("data of order in seller in seller :" , data);

        if(!data){
            toast.error("Backend will not provide any thing !!");
        }

        if(data.success){
            setOrders(data.orders);
        }else{
            toast.error(data.message);
        }
     } catch (error) {
        console.log(error);
        toast.error(error)
     }
   };

   useEffect(() => {
    fetchOrder();
   },[])

    return (
        <div className='no-scrollbar flex-1 h-[95vh] overflow-x-scroll '>
            <div className="md:p-10 p-4 space-y-4">
                 <h2 className="text-lg font-medium">Orders List</h2>
                        {orders.map((order, index) => (
                            <div key={index} className="flex flex-col  md:items-center md:flex-row  justify-between  gap-5 p-5 max-w-4xl rounded-md border border-gray-300">
                                <div className="flex gap-5 max-w-80">
                                    <img className="w-16 h-16 object-cover " src={assets.box_icon} alt="boxIcon" />
                                    <div>
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex flex-row ">
                                                <p className="font-medium ">
                                                    {item.product.name} <span className={"text-primary"}>x {item.quantity}</span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-sm md:text-base text-black/60">
                                    <p className='text-black/80'>{order.address.firstName} {order.address.lastName}</p>
                                    <p>{order.address.street}, {order.address.city} </p>
                                     <p> {order.address.state},{order.address.zipcode}, {order.address.country}</p>
                                     <p></p>
                                     <p>{order.address.phone}</p>
                                </div>

                                <p className="font-medium text-lg my-auto">{currency}{order.amount}</p>

                                <div className="flex flex-col text-sm">
                                    <p>Method: {order.paymentType}</p>
                                    <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    <p>Payment: {order.isPaid  ? "Paid" : "Pending"}</p>
                                </div>
                            </div>
                        ))}       
             </div>
        </div>
        
    );
};


export default Orders
