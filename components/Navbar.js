import React,{useState} from 'react'
import Link from "next/link"
import {useRouter} from "next/router"

export default function Navbar() {
  const [showToggler,setShowToggler]=useState(false)
  const router=useRouter()
  const currentPath=router.pathname

  return (
   
<nav className="w-screen bg-gray-100 border-gray-200 px-2 sm:px-4 py-1  ">
  <div className="container flex flex-wrap justify-between md:justify-start items-center mx-auto">
    <div></div>
    <div className='flex items-center justify-center'>
    <Link href="/" className="flex items-center">
        <span className="self-center text-xl font-semibold whitespace-nowrap text-white bg-violet-900  rounded-xl  p-2 px-2 text-center">Attendance</span>
    </Link>
    </div>

    <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
          <Link href="/"><a className={`${currentPath=="/" ? "text-violet-600" : 'text-gray-500' }  px-3 py-2 rounded-md text-sm font-medium` }aria-current="page">Home</a></Link>
          <Link href="/dashboard/addstudent"><a className={`text-gray-500  px-3 py-2 rounded-md text-sm font-medium` }aria-current="page">Dashboard</a></Link>

          <button  ><a className={`text-gray-500  px-3 py-2 rounded-md text-sm font-medium` }aria-current="page">Logout</a></button>
      
          </div>
        </div>

    <div>
    <button onClick={()=>{setShowToggler(!showToggler)}} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2  text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    </button>


    </div>
  </div>

{showToggler&&  <div className="w-full md:block md:w-auto flex justify-end  mt-2 px-2 pt-2 pb-3 " id="navbar-default">
      <ul className="flex flex-col space-y-2">
        <Link href="/"><li onClick={()=>{setShowToggler(!showToggler)}}>
          <a className={`${currentPath==="/" ? "text-violet-600" : 'text-gray-500'}  px-3 py-2 rounded-md text-sm font-medium`}>Home</a>
        </li></Link>
        <Link href="/dashboard/addstudent"><li onClick={()=>{setShowToggler(!showToggler)}}>
          <a className={`text-gray-500  px-3 py-2 rounded-md text-sm font-medium`}>Dashboard</a>
        </li></Link>
        <Link href="/"><li onClick={()=>{setShowToggler(!showToggler)}}>
          <a className={`text-gray-500  px-3 py-2 rounded-md text-sm font-medium`} >Logout</a>
        </li></Link>
        
        {/* <li>
          <a  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
        </li> */}
      </ul>
    </div>}
</nav>

  )
}
