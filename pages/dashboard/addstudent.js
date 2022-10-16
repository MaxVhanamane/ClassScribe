import React,{useState,useEffect} from 'react'
import { useRef } from 'react';

import { useRouter } from 'next/router';
import Head from "next/head";
import DashboardSidebar from '../../components/DashboardSidebar';
import { toast } from 'react-toastify';


export default function AddStudent() {
const [uploading,setUploading]=useState(false)
const [studentDetails,setStudentDetails]=useState({
    
        name: "",
        email: "",
        className: "",
        division:"",
        rollNumber: "",
       
      
})



// const router=useRouter()
// useEffect(()=>{
//   const fetchUser= async ()=>{
//    const res=await fetch( `${process.env.NEXT_PUBLIC_HOST}/api/getuserdetails`, {
//           method: 'POST', // or 'PUT'
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({tokenVal:localStorage.getItem("token")}),
//         })

//         const finalRes = await res.json()
//         if( !(finalRes.success && finalRes.role==="admin")){
//           localStorage.removeItem("user")
//           localStorage.removeItem("token")
//           localStorage.removeItem("role")
//           router.push("/")
//         }
        
      
//   }
//   let adminToken=localStorage.getItem("token")
//   let role=localStorage.getItem("role")

//   if(!(adminToken && role==="admin"))
//   {
//     localStorage.removeItem("user")
//     localStorage.removeItem("token")
//     localStorage.removeItem("role")
//     router.push("/")
//   }
//   else{
//     fetchUser()
//   }
 

// },[router.query])



const handleChange=(e)=>{
    if(e.target.name==="name"){
        setStudentDetails({
               ...studentDetails  ,
               name:e.target.value 
        })
    }

    else if(e.target.name==="email"){
        setStudentDetails({
            ...studentDetails  ,
            email:e.target.value 
     })
    }

    else if(e.target.name==="className"){
 setStudentDetails({
               ...studentDetails  ,
               className:e.target.value 
        })
    }

    else if(e.target.name==="division"){
 setStudentDetails({
               ...studentDetails  ,
               division:e.target.value.toUpperCase() 
        })
    }

    else if(e.target.name==="rollNumber"){
 setStudentDetails({
               ...studentDetails  ,
               rollNumber:e.target.value 
        })
    }

    
}





 const handleAdd=async()=>{
    const data = {name:studentDetails.name,email:studentDetails.email,className:studentDetails.className,division:studentDetails.division,rollNumber:studentDetails.rollNumber};
     

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addstudent`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const response = await res.json()
    if(response.success){
        toast.success('Student added successfully!', {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setStudentDetails({
    ...studentDetails,
    name: "",
    email: "",
    className: "",
    division:"",
    rollNumber: "",
})

    }

    }

  return (
    <>
    <style jsx global>{`
       footer{
        display:none;
       }
       nav{
        display:none;
       }
      `}</style>
           <Head>
    <title>Dashboard - Add Students</title>
    <meta name="description" content="Add a food item" />
   </Head>
   <DashboardSidebar/>
    <div className="lg:ml-60 sticky top-0 bg-[#f9fafb] z-10">
    <div className="  p-3 font-bold md:text-3xl text-2xl  mx-auto text-center shadow  text-gray-50 bg-violet-900 drop-shadow mb-8 "><h1 className="text-center mx-auto">Add a student</h1></div></div>
    <div className='lg:ml-28 p-6  pt-6 flex justify-center w-full'>
    
    <div className="block p-6 rounded-lg shadow-lg bg-white w-[50rem]  mb-28">
        
      <div className="form-group mb-6">
        <label htmlFor="name"  className="formLabel inline-block mb-2 text-gray-700">Name</label>
        <input onChange={handleChange} value={studentDetails.name} name="name" type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="name"
          placeholder="Enter a name"/>
      </div>
      
     
      <div className="form-group mb-6">
        <label htmlFor="email"  className="formLabel inline-block mb-2 text-gray-700">Email</label>
        <input onChange={handleChange} value={studentDetails.email} name="email" type="email" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="email"
          placeholder="Enter a parent's mail id"/>
      </div>
      
     
      <div className="form-group mb-6">
        <label htmlFor="classname"  className="formLabel inline-block mb-2 text-gray-700">Class Name</label>
        <input onChange={handleChange} value={studentDetails.className} name="className" type="number" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="classname"
          placeholder="Enter a class name"/>
      </div>
      
     
      <div className="form-group mb-6">
        <label htmlFor="division"  className="formLabel inline-block mb-2 text-gray-700">Division</label>
        <input onChange={handleChange} value={studentDetails.division} name="division" type="text" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="division"
          placeholder="Enter a division name"/>
      </div>
      
     
      <div className="form-group mb-6">
        <label htmlFor="rollnumber"  className="formLabel inline-block mb-2 text-gray-700">Roll Number</label>
        <input onChange={handleChange} value={studentDetails.rollNumber} name="rollNumber" type="number" className="form-control
          block
          w-full
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="rollnumber"
          placeholder="Enter a roll number"/>
      </div>
      
     
      
      
    
     
      <button onClick={handleAdd} type="submit" className="
        px-6
        py-2.5
        bg-violet-900
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-violet-800 hover:shadow-lg
        focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-violet-800 active:shadow-lg
        transition
        duration-150
        ease-in-out">Add</button>



  </div></div></>
  )
}


