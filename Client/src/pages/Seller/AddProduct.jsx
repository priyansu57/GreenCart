import React, { useState } from 'react'
import { assets, categories, dummyProducts } from '../../assets/assets';
import toast from "react-hot-toast"
import {  useAppcontext } from '../../context/AppContext';
import Loader from './Loading';

function AddProduct() {
  
    const [files , setFiles ] = useState([]);
    const [productName , setProductName] = useState('');
    const[description , setDescription] = useState('');
    const[category , setCategory] = useState('');
    const[price , setPrice] = useState('');
    const[offerPrice , setOfferPrice] = useState('');
    const [Loading , setLoading] = useState(false);


  const {axiosShortener , seller} = useAppcontext();

    

    const onSubmitehandle = async(event) => {
        setLoading(true);
         event.preventDefault();
         try {

            const productData = {
                name : productName ,
                description  : description ?.split("\n"),
                category,
                price,
                offerPrice,
                seller,
            } 

            const formData = new FormData ();
              formData.append('productData' , JSON.stringify(productData))
              for(let i=0 ; i< files.length ; i++){
                  formData.append('images' , files[i]);
              }

            const { data } = await axiosShortener.post("/api/product/add" , formData);

            if(data.success){
                toast.success(data.message);
                setFiles([]);
                setDescription("");
                setOfferPrice("");
                setPrice("");
                setCategory("");
                setProductName("")
            }else{
                toast.error(data.message);
            }

         } catch (error) {
            console.log(error);
            toast.error(error.message);
         } finally {
            setLoading(false);
         }
    } 

   if(Loading) return <Loader category={category} productName={productName} files={files[0]}  /> 

    return (
        <>
        {/* <Loader />  */}
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between ">
            <form onSubmit={onSubmitehandle} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input onChange={(e) => {
                                    const UpdatedFiles = [...files];
                                    UpdatedFiles[index] = e.target.files[0];
                                    setFiles(UpdatedFiles);
                                } } accept="image/*" type="file" id={`image${index}`} hidden />
                                <img className='max-w-24 cursor-pointer' src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} alt="file" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e) => setProductName(e.target.value)} value={productName} 
                    id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e) => setCategory(e.target.value)} value={category}
                     id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                          {categories.map((item , index) => (   
                        <option key={index} value={item.path} className='z-50 '>{item.path}</option>
                       ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e) => setPrice(e.target.value)} value={price}
                         id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice} id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
                <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">ADD</button>
            </form>
        </div> 
       </>  
    );
};


export default AddProduct
