import { useState } from 'react'
import { Navbar } from './component/HomeComponent//Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import {Toaster} from "react-hot-toast"
import Footer from './component/HomeComponent/Footer'
import Login from './component/Auth/Login'
import { useAppcontext } from './context/AppContext'
import AllProduct from './pages/AllProduct'
import ProductCategoy from './pages/ProductCategoy'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Card'
import AddAddress from './pages/AddAddress'
import MyOrder from './pages/MyOrder'
import SellerLogin from './component/Seller/SellerLogin'
import SellerLayout from './pages/Seller/SellerLayout'
import AddProduct from './pages/Seller/AddProduct'
import ProductList from './pages/Seller/ProductList'
import Orders from './pages/Seller/Orders'
import Loader from './component/Loader'

function App() {

  const isSellerLocation = useLocation().pathname.includes("seller");
  const {showUserLogin,isSeller} = useAppcontext();
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'> 
    {  isSellerLocation ? null : <Navbar />}
    {showUserLogin ? <Login /> : null}
    
    <Toaster />
    <div className= {`${isSellerLocation ? "" : 'px-6 md:px-16 lg:px-24 xl:px-32 flex-2' } `}>
      <Routes>
         <Route path="/" element={<Home /> } />
         <Route path='/products' element={<AllProduct />}/>
         <Route path='/products/:category' element={<ProductCategoy />} />
         <Route path='/products/:category/:id'  element={<ProductDetail />}/>
         <Route path='/cart' element={<Cart />}/>
         <Route path='/add-address' element={<AddAddress />}/>
         <Route path='/my-orders' element={<MyOrder />}/>
         <Route path='/loader' element={<Loader />}/>
         <Route path='/seller' element={isSeller ?  <SellerLayout /> : <SellerLogin />}>
            <Route index   element={isSeller ? <AddProduct /> : null} />
            <Route  path='product-list' element={<ProductList />} />
            <Route  path='orders' element={<Orders />} />
         </Route> 
      </Routes>
      
    </div>
    {isSellerLocation ? null :  <Footer />}
    </div>
  )
}

export default App
