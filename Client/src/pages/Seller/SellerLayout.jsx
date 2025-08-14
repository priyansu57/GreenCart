import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppcontext } from "../../context/AppContext";
import toast from "react-hot-toast";


function SellerLayout() {

    const {setIsSeller,navigate,seller, axiosShortener} = useAppcontext();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout = async() => {
        try {
        const{data} = await axiosShortener.post("/api/seller/logout" );
          if(data.success){
              setIsSeller(false);
              navigate("/")
              toast.success( `${seller} was Logout.`);
              
            }else{
                  toast.error(data.message)
                  }
        }catch (error) {
             toast.error(error.message);
            }
    }

    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to={'/'}>
                    <img src={assets.logo} alt="logo" className="cursor-pointer w-34 md:w-38" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi,&nbsp;<span className="text-primary">{seller.toUpperCase()}</span></p>
                    
                   

                    <button onClick={() =>  navigate("/")} className='border rounded-full text-sm px-4 py-1 cursor-pointer hover:border-primary'>Home</button>

                    <style>{`
                        .button-wrapper::before {
                            animation: spin-gradient 4s linear infinite;
                        }

                        @keyframes spin-gradient {
                            from {
                            transform: rotate(0deg);
                            }

                            to {
                            transform: rotate(360deg);
                            }
                        }
                        `}</style>

                        <div className="relative inline-block p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_#84cc16,_#bbf7d0,_#84cc16)] button-wrapper">
                        <button onClick={logout} className="relative z-10 bg-gray-100 text-gray-600 rounded-full px-5 py-1.5  text-sm">
                            Logout
                        </button>
                        
                        </div>

                </div>
            </div>
            <div className="flex ">
                 <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item) => (
                    <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
                        className={ ({isActive}) =>  `flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] border-primary bg-primary/10 text-primary"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`
                        }
                    >
                        <img src={item.icon} alt="icon"  className="w-7 h-7"/>
                        <p className="md:block hidden text-center">{item.name}</p>
                    </NavLink>
                ))}
            </div>
            <Outlet />
            </div>
           
        </>
    );
}

export default SellerLayout
