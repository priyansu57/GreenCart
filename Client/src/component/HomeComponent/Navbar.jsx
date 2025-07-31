
import {NavLink} from "react-router-dom"
import { assets } from "../../assets/assets"
import { useEffect, useState } from "react"
import { useAppcontext } from "../../context/AppContext";
import "../../index.css"
import toast from "react-hot-toast";
import Button from "../Button";

export  const Navbar = () => {
    const [open, setOpen] = useState(false);

    const {user , setUser , navigate , setShowuserLogin ,axiosShortener, showuserLogin ,setSearchQuery,searchQuery,getCardCount} = useAppcontext();



  const logout = async() => {
     try {
        const{data} = await axiosShortener.post("/api/user/logout" );
          if(data.success){
              navigate("/")
              toast.success(`${user}, You are Logout`);
                setUser(false);
            }else{
                  toast.error(data.message)
                  }
        }catch (error) {
             toast.error(error.message);
            }
    }

  useEffect(() => {
    console.log("searchQuery" , searchQuery);
    
    if(searchQuery.length > 0){
         navigate("/products")
    }
  },[searchQuery])


    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative  transition-all">

            <NavLink to="/">
                <img className="h-9" src={assets.logo} alt="logo" onClick={() => setOpen(false)} />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden  lg:flex items-center text-base gap-6">
     
              {/* <button onClick={  () => navigate("/seller")} className='border border-gray-400 rounded-full  text-sm px-4 py-1 cursor-pointer hover:border-primary'>Seller Dashboard</button>  */}
               <Button text={"Seller Dashboard"}  />

                <NavLink to="/"    className={({isActive}) => isActive ? "text-lime-500 relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full " : 
                "text-black relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full"} >Home</NavLink>

                <NavLink to="/products"    className={({isActive}) => isActive ? "text-lime-500 relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full " : 
                "text-black relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full"} >All Products</NavLink>

                       

                <div className="flex  items-center text-base gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" onChange={(e) => setSearchQuery(e.target.value)}/>
                     <img  src={assets.search_icon} alt="search" className="w-4 h-4"/>
                </div>

                <div onClick={() => navigate("/cart")} className="  relative cursor-pointer">
                    <img  src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCardCount()}</button>
                </div>

                { !user ?  (<button className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full" onClick={() => {setShowuserLogin(!showuserLogin); }} >
                    Login
                </button>) : (
                    <div className="relative group">
                       <img src={assets.profile_icon} alt="profile" className="w-10" />  
                       <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                         <li onClick={() => navigate("/my-orders")} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">My Orders</li>
                         <li onClick={logout} className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer" >Logout</li>

                        </ul> 
                    </div>
                )}
            </div>

            <div className="flex items-center  gap-4 -mr-16 lg:hidden " >

              <button onClick={  () => navigate("/seller")} className='border border-gray-400  rounded-full sm:h-8 sm:rounded-full  text-sm px-2 py-1 cursor-pointer hover:border-primary'>Seller Dash</button> 

              <div className="flex sm:h-8 w-[40%] items-center text-2 gap-4 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 sm:w-[90%] w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products"  onChange={(e) => setSearchQuery(e.target.value)}/>
                     <img  src={assets.search_icon} alt="search" className="w-4 h-4"/>
                </div>

              <div className=" relative  cursor-pointer">
                    <img  onClick={() => navigate("/cart")} src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-70" />
                    <button className="absolute -top-3 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCardCount()}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="lg:hidden ml-2">
                    {/* Menu Icon SVG */}
                    <img src={assets.menu_icon} alt="menu" className="active:scale-x-75" />
                </button>
            </div>

        {/* Mobile Menu */}
           { open && 
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 justify-end w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-base font-normal lg:hidden z-50 `}>
                <NavLink to="/" onClick={() => {setOpen(false); 
                  }} className={({isActive}) => isActive ? "text-lime-500 relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full " : 
                "text-black relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full"}>Home</NavLink>

                  <NavLink to="/products" onClick={() => setOpen(false)} className={({isActive}) => isActive ? "text-lime-500 relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full " : 
                "text-black relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full"}>All products</NavLink>

                  {user &&  
                       <NavLink to="/my-orders" onClick={() => setOpen(false)} className={({isActive}) => isActive ? "text-lime-500 relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full " : 
                "text-black relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full"}>My order</NavLink>}

                   <NavLink to="/contact" onClick={() => setOpen(false)} className={({isActive}) => isActive ? "text-lime-500 relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full " : 
                "text-black relative  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-lime-300 before:transition-all before:duration-300 hover:before:w-full"}>Contact</NavLink>

               {!user ? (
                 <button onClick={() =>{ setOpen(false); setShowuserLogin(true);}} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                    Login
                </button>
               ) : (
                   <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                      Logout
                   </button>
               )}
               
            </div>}

        </nav>
    )
}