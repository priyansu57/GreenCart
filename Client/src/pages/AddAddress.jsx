import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast';
import { useAppcontext } from '../context/AppContext';

function AddAddress() {

    const {axiosShortener , user , navigate} = useAppcontext();

  const [address , setAddress] = useState({
    firstName : '',
    lastName: '',
    email:'',
    street:'',
    city:'',
    state: '',
    pincode : '',
    country: '',
    phone: '',
  })
   
     const handleChange = (e) => {
        // console.log("user i want  :" , user);
        
        const {name , value} = e.target;
        setAddress((prevAddress) => ({
             ...prevAddress , [name] : value , userId : user.user?._id 
        }))
     }


    const onsubmithandler = async (e) => {
       
        try {
             e.preventDefault();
           const { data } = await axiosShortener.post("/api/address/add" , {address , user}) 
           if (!data) {
                toast.error("No data returned from server.");
                return;
            }
           if(data.success){
            toast.success(data.message);
            navigate("/cart")
           }else{
            toast.error(data.message)
           }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(!user){
            navigate("/cart");
            toast.error("Login Please !!")
        }
    },[])

    return (
        <div className='mt-16 pb-16'>
            <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping 
                <span className='font-semibold text-primary'>Address</span>
            </p>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
                <div className='flex-1 max-w-md'>
                     {/* <form onSubmit={onsubmithandler} className='space-y-3 mt-6 text-sm'>
                        <div className='grid grid-cols-2 gap-4'>
                            <input handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition '/>
                             <input handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition ' />
                        </div>
                       
                            <input handleChange={handleChange} address={address} name="email" type="email" placeholder="Email Name" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition ' />
                            <input handleChange={handleChange} address={address} name="street" type="street" placeholder="street Name" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition '/>

                          <div className='grid grid-cols-2 gap-4 '> 
                            <input handleChange={handleChange} address={address} name="city" type="city" placeholder="city" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition '/>
                            <input handleChange={handleChange} address={address} name="state" type="state" placeholder="state" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition '/>
                        </div>
                        
                        <div className='grid grid-cols-2 gap-4 '> 
                            <input handleChange={handleChange} address={address} name="pincode" type="pincode" placeholder="pincode" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition ' />
                            <input handleChange={handleChange} address={address} name="country" type="country" placeholder="country" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition ' />
                        </div>
                            <input handleChange={handleChange} address={address} name="phone" type="phone" placeholder="phone" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition ' />
                            <button className='w-full mt-6 bg-primary text-white py-3 
                                 hover:bg-primary-dull transition cursor-pointer uppercase'>Save address</button>
                     </form> */}

                     <form onSubmit={onsubmithandler} className='space-y-3 mt-6 text-sm'>
                            <div className='grid grid-cols-2 gap-4'>
                                <input onChange={handleChange} value={address.firstName} name="firstName" type="text" placeholder="First Name" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition '/>
                                <input onChange={handleChange} value={address.lastName} name="lastName" type="text" placeholder="Last Name" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition ' />
                            </div>

                            <input onChange={handleChange} value={address.email} name="email" type="email" placeholder="Email" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition ' />
                            <input onChange={handleChange} value={address.street} name="street" type="text" placeholder="Street" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition '/>

                            <div className='grid grid-cols-2 gap-4 '> 
                                <input onChange={handleChange} value={address.city} name="city" type="text" placeholder="City" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition '/>
                                <input onChange={handleChange} value={address.state} name="state" type="text" placeholder="State" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition '/>
                            </div>

                            <div className='grid grid-cols-2 gap-4 '> 
                                <input onChange={handleChange} value={address.pincode} name="pincode" type="text" placeholder="Pincode" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition ' />
                                <input onChange={handleChange} value={address.country} name="country" type="text" placeholder="Country" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition ' />
                            </div>

                            <input onChange={handleChange} value={address.phone} name="phone" type="text" placeholder="Phone" className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition ' />
                            <button className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save address</button>
                        </form>
                </div>
                <img src={assets.add_address_iamge} alt="address-image" className='md:mr-16 mb-16 md:mt-0' />
            </div>
        </div>
    )
}

export default AddAddress
