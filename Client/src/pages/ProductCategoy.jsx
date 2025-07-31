import React from 'react'

import { useParams } from 'react-router-dom';
import { ProductCard } from '../component/HomeComponent/ProductCard';
import { useAppcontext } from '../context/AppContext';
import { assets , categories } from '../assets/assets';

function ProductCategoy() {

    const { product }  = useAppcontext();
     const { category } = useParams();

     console.log("cateory product " , product);
     console.log("categoy :" , category);
     console.log("categories :" , categories);
     
     const searchCategory = categories.find((item) => item.path.toLowerCase() === category)
    const filteredProduct =  product.filter((filter) => filter.category.toLowerCase() === category);
    return (
        <div className='mt-16'>
            {searchCategory && (
                <div className='flex flex-col items-end w-max'>
                    <p className='text-2xl font-medium' >{searchCategory.text.toUpperCase()}</p>
                     <div className='w-16 h-0.5 bg-primary rounded-full'></div>
                       
                </div>
            )}
            { filteredProduct.length > 0 ? (
                <div className='flex gap-4 mt-16 flex-wrap'>
                      {filteredProduct.map((data , idx) => <ProductCard key={idx} product={data}/>)}
                </div>
            ): (
                <div className='flex items-center justify-center h-[60vh]'>
                    <p className='text-2xl font-medium text-primary'>No products found in this category .</p>
                </div>
            )}
        </div>  
    )
}

export default ProductCategoy

