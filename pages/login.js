import React, { useState, useEffect, useContext } from 'react'
import Link from "next/link"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Head from "next/head";
import { AuthContext } from '../context/AuthState';
import { GiDeskLamp } from "react-icons/gi"
import Image from 'next/image';


export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setToken, setRole } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.push("/")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

    const data = { email, password };

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const response = await res.json()

    if (response.success) {

      localStorage.setItem("token", response.jwtToken)
      localStorage.setItem("role", response.role)

      let token = localStorage.getItem("token")
      let role = localStorage.getItem("role")

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
    else {
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
        <title>AttendanceMaster - Login</title>
        <meta name="description" content="Login page" />
      </Head>
      <section className=" bg-gray-50 fixed  top-[54px]   inset-0 ">

          <div className="flex justify-center items-center  text-gray-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   w-full  lg:w-1/2 sm:w-[70%] md:w-[90%]  ">
            <div className=" w-full flex items-center justify-center flex-col md:flex-row  mx-6   shadow-md shadow-gray-400 rounded-lg px-2 ">
              <div className="  overflow-hidden ">
              <div className='lg:w-80 lg:h-80 w-64 h-64 md:w-72 md:h-72 relative'>
                <Image priority={true} src={"/school.svg"} layout="fill" objectFit="contain" alt='Illustration of students going to school' />
                </div>
              </div>
              <div className=" md:w-80 w-64">
                <div className="">
                  <div className=" px-4 md:px-0">
                    <div className="md:p-10   ">
                      <div className="flex items-center justify-center flex-col">
                        <div className="w-[3.25rem] hidden  bg-teal-500 h-[3.25rem] md:flex items-center justify-center text-white rounded-full font-bold mt-6 md:mt-auto shadow-lg shadow-gray-50  "><GiDeskLamp className='text-3xl' /></div>
                        <h4 className="text-xl md:text-2xl font-semibold  mb-5 mt-2 pb-1 text-gray-700">Login</h4>
                      </div>
                      <form onSubmit={handleLogin} className="" >
                        <div className="mb-4">
                          <input
                            onChange={handleChange}
                            type="email"
                            className=" block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-600 focus:outline-none"
                            id="email"
                            placeholder="Email"
                            name="email"
                            required
                          />
                        </div>
                        <div className="mb-4">
                          <input
                            onChange={handleChange}
                            type="password"
                            className=" block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-teal-600 focus:outline-none"
                            id="password"
                            placeholder="Password"
                            name="password"
                            required
                          />
                        </div>
                        <div className="text-center pt-1 mb-10 pb-1">
                          <button
                            className=" bg-teal-500 hover:bg-teal-600 ease-linear transition-all duration-150 inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight  rounded shadow-md   active:shadow-lg  w-full mb-3 "
                            type="submit"
                          >
                            Log in
                          </button>
                          <Link href="/forgotpassword" ><span className="text-gray-600 hover:text-gray-800 ease-linear transition-all duration-150 font-semibold text-md cursor-pointer">Forgot password?</span></Link>
                        </div>
                      </form>
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
