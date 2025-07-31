import React, { useEffect, useState } from 'react'
import { useAppcontext } from '../../context/AppContext'
import toast from 'react-hot-toast';

function SellerLogin() {
  
    const {isSeller , setIsSeller ,setSeller,axiosShortener , navigate , state , setState} = useAppcontext();
    const [name, setName] = useState("");
    const[email , setEmail] = useState("");
    const [password , setPassword] = useState("");
 
    // const onSubmiteHandler = async (e) => {
    //     try {
    //       e.preventDefault();
    //       const {data} = await axiosShortener.post("/api/seller/login" , {email , password})
    //        if(data.succees){
    //         setIsSeller(true);
    //         navigate("/seller")
    //        }else{
    //         toast.error(data.message)
    //        }

    //     } catch (error) {
    //         toast.error(error.message)
    //     }
    // }

 const handleSubmite = async (e) => {
    try {
       e.preventDefault();
        if(state === "register"){
            const{data} = await axiosShortener.post("/api/seller/register" , {name , email , password});
             console.log("data of seller :" , data.seller);
             if(data.success){
                setSeller(data.seller.name)
                setIsSeller(true);
               navigate("/seller")
              toast.success("user was login .");
           }else{
            toast.error(data.message)
           }
        } else{
            const {data} = await axiosShortener.post("/api/seller/login" , {email , password})
             if(data.success){
                console.log("data of seller :" , data.seller.name);
                setSeller(data.seller.name);
               setIsSeller(true);
               navigate("/seller")
              toast.success("user was login .");
           }else{
            toast.error(data.message)
           }
        }
    } catch (error) {
         toast.error(error.message)
    }
    }

   useEffect(() => {
    if(isSeller) {
        navigate("/seller")
    }
   },[isSeller]);

    return  !isSeller && (
       <div className='bg-[url(/food.png)] bg-cover'>
        <form onSubmit={handleSubmite}
       className='min-h-screen flex items-center text-sm text-gray-100'>
          <div className='flex flex-col gap-5 m-auto items-start p-8 py-12
            min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
            <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller_</span><span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}</p>
            {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                    </div>
                )}
           <div className='w-full'>
               <p>Email</p>
               <input type="email"  placeholder='Enter email !!' 
               className='border border-gray-200 rounded w-full p-2 
                mt-1 outline-primary' value={email} name='email' required onChange={(e) => setEmail(e.target.value)}/>
           </div>
           <div className='w-full'>
               <p>Password</p>
               <input type="password" placeholder='Enter Password !!' className='border border-gray-200 rounded w-full p-2 
                mt-1 outline-primary' required  value={password}  name="password" onChange={(e) => setPassword(e.target.value)} />
           </div>
           {state === "register" ? (
                    <p>
                        Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p>
                        Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                    </p>
                )}
                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
           </div>
       </form>
       </div>
    )
}

export default SellerLogin
