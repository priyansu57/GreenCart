import {  createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider  = ({children}) => {

   const currency = import.meta.env.VITE_CURRENCY
   
    const navigate = useNavigate();
    const [state, setState] = useState("login");
    const [seller , setSeller] = useState("");
    const[user , setUser] = useState(false);
    const[isSeller , setIsSeller] = useState(false);
    const[showUserLogin , setShowuserLogin] = useState(false);
    const [product , setProduct] = useState([]);
    const [cartItems, setcartItems] = useState({});
    const [searchQuery , setSearchQuery ] = useState({})


    const  axiosShortener = axios.create({
      baseURL : import.meta.env.VITE_BACKEND_URL,
      withCredentials : true,
    })


    const fetchSeller_auth = async () => {
       try {
        const {data} = await axiosShortener.get("/api/seller/is-auth");

        if(data.success){
          setIsSeller(true);
          setSeller(data.seller.name);
        }else{
          setIsSeller(false)
        }
       } catch (error) {
        setIsSeller(false)
       }
    }

     const fetchUser_auth = async () => {
       try {
        const {data} = await axiosShortener.get("/api/user/is-auth");

        if(data.success){
          setUser(data)
        }else{
          setUser(false)
        }
       } catch (error) {
        setUser(false)
       }
    }



    // Add to cart Product !!
    const addToCart = (itemId) => {
      let cartData = structuredClone(cartItems);
      console.log("cartdata" , cartData[itemId]);
      
      if(cartData[itemId]){
        cartData[itemId] += 1;
      }else {
        cartData[itemId] = 1;
      }
      setcartItems(cartData);
      toast.success("Added to Cart");
    }
  
   // Update to cart Product !!
   
   const updateToCart = (itemId , quantity) => {
    let cartDate = structuredClone(cartItems);
    cartDate[itemId] = quantity ;
    setcartItems(cartDate);
    toast.success("Cart  Update ")
   } 

   // Remove to cart Product 
   
   const removeToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
      cartData[itemId] -= 1;
      if(cartData[itemId] === 0) {
        delete cartData[itemId] ;
      }
    }
    setcartItems(cartData);
    toast.success("Remove from Cart ")
   }



   
    const fetchProduct = async () => {
      try {
        
        const { data} = await axiosShortener.get("/api/product/list");
        
       if(data.success){
        setProduct(data.product)
       }else{
        toast.error(data.message)
       }

      } catch (error) {
         toast.error(error.message)
      }
    };
  
    
    const getCardCount = () => {
      let totalamount = 0;
      for(const item in cartItems){
        totalamount += cartItems[item];
      }
      return totalamount 
    }

    const getCartAmount = () => {
      let totalamount = 0 ;
      for (const item in cartItems) {
        let iteminfo = product.find((product) => product._id === item);
        // console.log("itemInfo : " , iteminfo);
        // console.log("itemInfo of cArt : " , cartItems[iteminfo._id]);
        if(cartItems[iteminfo._id] > 0){
          totalamount += iteminfo.offerPrice * cartItems[iteminfo._id]
        }
      }
      return totalamount
    }
    
    useEffect (() => {
      fetchUser_auth();
      fetchSeller_auth();
      fetchProduct();
      console.log(isSeller);
      
    },[])

    useEffect (() => {
      const updateCart = async () => {
        try {
          const {data} = await axiosShortener.post("/api/cart/update" , {cartItems , user});
          if(!data.success){
            toast.error(data.message)
          }
          console.log("updateCart :" , data);
          
        } catch (error) {
          toast.error(error.message)
        }
      }

      if(user){
        updateCart();
      }
    } ,[cartItems])


    

    const value = {navigate,setcartItems, fetchProduct, seller , setSeller ,state, setState ,axiosShortener ,getCartAmount,getCardCount, setSearchQuery, searchQuery,  user , setUser , isSeller , setIsSeller , showUserLogin ,setShowuserLogin, product , currency , addToCart , removeToCart , axios , updateToCart , cartItems};

    return <AppContext.Provider value={value}>
                 {children}
            </AppContext.Provider>
}

export const useAppcontext = () => {
   return useContext(AppContext);
}