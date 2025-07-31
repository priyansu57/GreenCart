import React from 'react'


import { ProductCard } from './ProductCard';
import { useAppcontext } from '../../context/AppContext';

function BestSeller() {

    const {product} = useAppcontext();
     console.log(product);
    
    return (
        <div className='mt-16'>
             <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
          
          <div className='flex sm:gap-4 lg:gap-12  flex-wrap mt-[30px] '>
              {
                product.slice(0,5).map((value , idx) => <ProductCard  key={idx} product={value} />)
            }
          </div>
            
        </div>
    )
}

export default BestSeller
