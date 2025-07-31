import React, { useEffect, useState } from 'react'
import { useAppcontext } from '../context/AppContext'
import { ProductCard } from '../component/HomeComponent/ProductCard';

function AllProduct() {
 
    const {product , searchQuery} = useAppcontext();
    const [filterProduct , setFilterProduct] = useState([]);

    console.log( "just check !!" ,  product);
  useEffect(() => {
    if(searchQuery.length  > 0) {
        setFilterProduct( product.filter((product) => product.name.toLowerCase().includes(searchQuery)))
    }else{
        setFilterProduct(product)
    }
  },[product , searchQuery]);

    return (
        <div className='mt-16 flex flex-col'>
             <div className=' w-max flex flex-col items-end '>
                <p className='text-2xl font-medium uppercase'>All Products</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
             </div>

             <div className='mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5'>
                {filterProduct.filter((product) => product.inStock).map((fillproduct , idx) => (
                    <ProductCard  product={fillproduct} key={idx}/>
                ) )}
             </div>
        </div>
    )
}

export default AllProduct
