import React, { useEffect } from 'react'
import { useAppcontext } from '../context/AppContext'
import { useLocation } from 'react-router-dom';

function Loader() {

    const {navigate } = useAppcontext();
    let {search} = useLocation();
    const query = new URLSearchParams(search); 
    const nextUrl = query.get("next");

    useEffect(() => {
        if(nextUrl){
            setTimeout(() => {
                navigate(`/${nextUrl}`)
            },5000);
        }
    },[nextUrl]);

    return (
        <div className='flex flex-col gap-4 justify-center items-center h-screen'>
            <p className="text-2xl flex items-center gap-1 text-teal-700" >
                Authenticate
                <span className="ml-1 flex gap-1">
                    <span className="animate-bounce [animation-delay:0s] font-extrabold ">.</span>
                    <span className="animate-bounce [animation-delay:0.2s] font-extrabold">.</span>
                    <span className="animate-bounce [animation-delay:0.4s] font-extrabold">.</span>
                </span>
                </p>
            <div className='
            animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary
            '></div>
        </div>
    )
}

export default Loader
