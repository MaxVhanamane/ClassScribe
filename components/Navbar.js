import React,{useState,useContext} from 'react'
import Link from "next/link"
import {useRouter} from "next/router"
import { AuthContext } from './../context/AuthState';

export default function Navbar() {
  const [showToggler,setShowToggler]=useState(false)
  const [changeHambIcon,setChangeHambIcon]=useState(true)
  const [changeHambIcon2,setChangeHambIcon2]=useState(false)
  const router=useRouter()
  const currentPath=router.pathname
  const {
    removeToken,
    token,
    role
  } = useContext(AuthContext);
  return (
   
<nav className="w-screen bg-gray-100 border-gray-200 px-2 sm:px-4 py-2 fixed z-20 top-0  " id="nav">
  <div className=" flex flex-wrap  ">
   
    <div className='w-full relative sm:w-auto flex items-center justify-center'>
    <Link href="/">
        <span className="self-center text-xl font-semibold whitespace-nowrap text-white bg-violet-900  rounded-xl  py-1 px-2 text-center">Attendance</span>
    </Link>

    <div className="absolute inset-x-0 left-0 flex items-center sm:hidden">
        {/* <!-- Mobile menu button--> */}
        <button onClick={()=>{setShowToggler(!showToggler)}} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400  focus:outline-none " aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          {/* <!--
            Icon when menu is closed.

            Heroicon name: outline/bars-3

            Menu open: "hidden", Menu closed: "block"
          --> */}
       {  changeHambIcon && <svg onClick={()=>{setChangeHambIcon(!changeHambIcon)
      }}className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>}
          {/* <!--
            Icon when menu is open.

            Heroicon name: outline/x-mark

            Menu open: "block", Menu closed: "hidden"
          --> */}
       {  !changeHambIcon&& <svg onClick={()=>{setChangeHambIcon(!changeHambIcon)
      setChangeHambIcon2(!changeHambIcon2)}} className=" h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>}
        </button>
      </div>
    </div>

 { router.pathname!="/login"&&  <div className="hidden md:flex items-center justify-center sm:block sm:ml-6">
          <div className=" space-x-4 ">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <Link href="/"><a className={`${currentPath=="/" ? "text-violet-600" : 'text-gray-500' } hover:text-gray-700  px-3 py-2 rounded-md text-sm font-medium` }aria-current="page">Home</a></Link>
        <Link href="/dashboard/addstudent"><a className={`text-gray-500 hover:text-gray-700  px-3 py-2 rounded-md text-sm font-medium` }aria-current="page">Dashboard</a></Link>

          <button onClick={()=>{removeToken()}} ><a className={`text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium` }aria-current="page">Logout</a></button>
      
          </div>
        </div>}

   
  </div>



      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
{  (showToggler && router.pathname!="/login" )&&<div className="sm:hidden absolute left-0 bg-gray-100 w-full" id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col z-">
    <ul className="flex flex-col space-y-2">
        <Link href="/"><li onClick={()=>{setShowToggler(!showToggler);setChangeHambIcon(!changeHambIcon)}}>
          <a className={`${currentPath==="/" ? "text-violet-600" : 'text-gray-500'}  px-3 py-2 rounded-md text-sm font-medium`}>Home</a>
        </li></Link>
        <Link href="/dashboard/addstudent"><li onClick={()=>{setShowToggler(!showToggler);setChangeHambIcon(!changeHambIcon)}}>
          <a className={`text-gray-500  px-3 py-2 rounded-md text-sm font-medium`}>Dashboard</a>
        </li></Link>
        <Link href="/"><li onClick={()=>{
          let confirmValue=confirm("Do you really want to Logout?")
          if(confirmValue){
            removeToken();
            setChangeHambIcon(!changeHambIcon)
          }
          }}>
          <a className={`text-gray-500  px-3 py-2 rounded-md text-sm font-medium`} >Logout</a>
        </li></Link>
        
      
      </ul>

    </div>
  </div>}
</nav>

  )
}


