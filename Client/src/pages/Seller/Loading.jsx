import React from "react";
import { assets } from "../../assets/assets";

function Loader({category , productName , files}) {
    
   

  return (
     
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center space-y-4">

            <div className="animate-bounce text-5xl">
               <img className='max-w-24 cursor-pointer' src={files ? URL.createObjectURL(files) : assets.upload_area} alt="file" width={100} height={100} />
            </div>
        
        {/* Message */}
        <p className="text-lg font-medium text-green-700 animate-pulse">
          {/* {message} */}
           { `${productName} was uploading...` }
        </p>

        {/* Small bar loader */}
        <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-2 w-1/2 bg-green-500 animate-[progress_2s_linear_infinite]"></div>
        </div>
      </div>

      {/* Tailwind keyframes for progress bar */}
      <style>
        {`
          @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}
      </style>
    </div>
  );
}

export default Loader;
