import React from 'react'
import { useAppcontext } from '../../context/AppContext';
import toast from 'react-hot-toast';

function Login() {

    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const {setShowuserLogin , axiosShortener ,setUser, navigate} = useAppcontext();

    // const handleSubmite = async (e) => {
        

    // try {
    //    e.preventDefault();
    //     // setUser = {
    //     //     name : "hello"
    //     // }
        
    
    //     if(state === "register"){
    //         const{data} = await axiosShortener.post("/api/user/register" , {name , email , password});
    //          if(data.success){
    //           setShowuserLogin(false) ;
    //           toast.success("user was login .");
    //           navigate("/");
    //        }else{
    //         toast.error(data.message)
    //        }
    //     } else{
    //          const{data} = await axiosShortener.post("/api/user/login" , { email , password});
    //          if(data.success){
    //           setShowuserLogin(false) ;
    //           toast.success("user was login .");
    //           navigate("/");
    //        }else{
    //         toast.error(data.message)
    //        }
    //     }
    // } catch (error) {
    //      toast.error(error.message)
    // }
    // }

     const handleSubmite = async (e) => {
        try {
             setUser(true);
           e.preventDefault();
            if(state === "register"){
                const{data} = await axiosShortener.post("/api/user/register" , {name , email , password});

                 if(data.success){
                    setUser(data.user.name);
                  setShowuserLogin(false) ;
                  navigate("/")
                  toast.success(`${data.user.name} , WellCome to GreenCart .`);
               }else{
                toast.error(data.message)
               }
            } else{
                const {data} = await axiosShortener.post("/api/user/login" , {email , password})
                 if(data.success){
                    console.log(data);
                    setUser(data.user.name);
                  setShowuserLogin(false) ;
                   navigate("/")
                  toast.success(`${data.user.name} , WellCome to GreenCart .`);
               }else{
                toast.error(data.message)
               }
            }
        } catch (error) {
            //  toast.error(error.message)
            console.log(error.message);
            
        }
        }


    return (
        <div onClick={() => {setShowuserLogin(false); }} className='fixed top-0 bottom-0 right-0 left-0 z-30 flex items-center text-sm text-gray-600 bg-black/50 ' >
            <form onSubmit={handleSubmite}
  onClick={(e) => e.stopPropagation()}  className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
                </p>
                {state === "register" && (
                    <div className="w-full">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="text" required />
                    </div>
                )}
                <div className="w-full ">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="email" required />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" type="password" required />
                </div>
                {state === "register" ? (
                    <p>
                        Already have account? <span onClick={() => setState("login")} className="text-primary cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p>
                        Create an account? <span onClick={() => setState("register")} className="text-primary cursor-pointer">click here</span>
                    </p>
                )}
                <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>
        </div>
    )
}

export default Login
