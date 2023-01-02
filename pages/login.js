import React, { useState,useEffect,useContext } from 'react'
import Link from "next/link"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Head from "next/head";
import { AuthContext } from '../context/AuthState';


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const{setToken,setRole}=useContext(AuthContext)
  const router=useRouter()
  useEffect(()=>{
 const token=localStorage.getItem("token")
 if(token){
  router.push("/")
 }
  },[])
  const handleChange = (e) => {
  
    if (e.target.name === "email") {
      setEmail(e.target.value)
    }
    else if (e.target.name === "password") {
      setPassword(e.target.value)
   
  }
}

  const handleLogin = async (e) => {
    e.preventDefault()
    
      const data = {  email, password };

      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const response = await res.json()
      if(response.success){
   localStorage.setItem("token",response.jwtToken)
   let token= localStorage.getItem("token")
    localStorage.setItem("role",response.role)
    let role=localStorage.getItem("role")
   setToken(token)
   setRole(role)
      toast.success('Logged in successfully!', {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     
        
        router.push("/")
    
    }
else{
  toast.error(response.error, {
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
   
    

  }
  return (
    <>
    <Head>
    <title>AttendanceNotifier - Login</title>
    <meta name="description" content="Login page" />
   </Head>
    <section className="h-screen gradient-form  ">
    <div className=" py-12 px-6 h-full">
   
      <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div className="xl:w-6/12 md:w-3/4">
          <div className="block bg-white shadow-lg rounded-lg">
            <div className="flex justify-center items-center g-0">
              <div className=" px-4 md:px-0">
                <div className="md:p-12 md:mx-6">
                  <div className="text-center rounded-full">
                   
                    <h4 className="text-2xl font-bold mt-1 mb-5 pb-1">Login</h4>
                  </div>
                  <form onSubmit={handleLogin}>
                    {/* <p className="mb-4">Please login to your account</p> */}
                    <div className="mb-4">
                      <input 
                      onChange={handleChange}
                        type="email"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="email"
                        placeholder="Email"
                        name="email"
                      />
                    </div>
                    <div className="mb-4">
                      <input
                      onChange={handleChange}
                        type="password"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="password"
                        placeholder="Password"
                        name="password"
                      />
                    </div>
                    <div className="text-center pt-1 mb-12 pb-1">
                      <button
                        className=" bg-violet-900 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight  rounded shadow-md   active:shadow-lg transition duration-150 ease-in-out w-full mb-3 pink_btn "
      
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        type="submit"
                      
                      >
                        Log in
                      </button>
                     <Link href="/forgotpassword" className="text-gray-500">Forgot password?</Link>
                    </div>
                  
                  </form>
                </div>
              </div>
       
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  )
}
