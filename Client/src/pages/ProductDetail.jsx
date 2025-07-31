import React, { useEffect, useState } from 'react'
import { useAppcontext } from '../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ProductCard } from '../component/HomeComponent/ProductCard';

function ProductDetail() {

   const {product , navigate , addToCart , currency} = useAppcontext();
   const {id} = useParams();
  

    const [relatedProducts , setRelatedProducts] = useState([])
    const [thumbnail, setThumbnail] = useState(null);
    const [targetProduct, setTargetProduct] = useState(null);

    //   const targetProduct = product.find((item) => item._id === id)
    //   console.log("targetProduct", targetProduct);
     
    useEffect(() => {
        if (product.length > 0) {
            const found = product.find((item) => item._id === id);
            setTargetProduct(found);
        }
    }, [ id,product]);


     

     useEffect(() => {
        if(targetProduct) {
            let productcopy = product.filter((item) => item.category === targetProduct.category);
             setRelatedProducts(productcopy);
        }
     },[targetProduct])



     useEffect(() => {
        setThumbnail(targetProduct?.image[0] ? targetProduct.image[0] : null)
     }, [targetProduct])
    console.log("relatedProducts" , relatedProducts);

    if (!targetProduct) return <div className="mt-12 text-center">Loading...</div>;


    return targetProduct && (
        <div className="mt-12">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${targetProduct.category.toLowerCase()}`}> {targetProduct.category}</Link> /
                <span className="text-primary"> {targetProduct.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {targetProduct.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{targetProduct.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            
                                <img key={i} src={i<4 ? assets.star_icon : assets.star_dull_icon} alt="rating" className='md:w-4 w-3.5' />
                            
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{targetProduct.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{targetProduct.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {targetProduct.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => {addToCart(targetProduct._id); }} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={() =>{ addToCart(targetProduct._id); navigate("/cart")}} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>


            {/* ---------- {Related Products} --------------- */}
            <div className='flex flex-col items-center mt-20'>
                <div className='flex flex-col items-center w-max'>
                    <p className='text-3xl font-medium'>Related Products</p>
                    <div className='w-20 h-0.5 bg-primary rounded-full mt-2'></div>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3
                    md:gap-6 lg:grid-cols-5 mt-6 w-full'>
                    {relatedProducts.length > 0 && relatedProducts.filter((item) => item.inStock).map((product,idx) => (
                        <ProductCard key={idx} product={product}/>
                    ))}
                </div>
                <button onClick={() => navigate("/products")} className='mx-auto cursor-pointer px-12 my-16 py-2.5 border 
                rounded text-primary hover:bg-primary/10 transition'>See More</button>
            </div>
        </div>
       
    );
};

export default ProductDetail
