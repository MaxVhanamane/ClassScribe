import React, { useState } from 'react'
import Head from "next/head";
import DashboardSidebar from '../../components/DashboardSidebar';
import { toast } from 'react-toastify';


export default function AddStudent() {
  
  const [teacherDetails, setTeacherDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    address: "",
    phone: "",
  })

  const handleChange = (e) => {

    if (e.target.name === "name") {
      setTeacherDetails({
        ...teacherDetails,
        name: e.target.value
      })
    }

    else if (e.target.name === "email") {
      setTeacherDetails({
        ...teacherDetails,
        email: e.target.value
      })
    }

    else if (e.target.name === "role") {
      setTeacherDetails({
        ...teacherDetails,
        role: e.target.value
      })
    }

    else if (e.target.name === "address") {
      setTeacherDetails({
        ...teacherDetails,
        address: e.target.value
      })
    }

    else if (e.target.name === "password") {
      setTeacherDetails({
        ...teacherDetails,
        password: e.target.value
      })
    }

    else if (e.target.name === "phone") {
      setTeacherDetails({
        ...teacherDetails,
        phone: e.target.value
      })
    }


  }

  const handleAdd = async () => {

    const teacherInfo = { name: teacherDetails.name, email: teacherDetails.email, role: teacherDetails.role, address: teacherDetails.address, password: teacherDetails.password, phone: teacherDetails.phone };

    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addteacher`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teacherInfo),
    })

    const response = await res.json()

    if (response.success) {

      toast.success('Teacher added successfully!');

      setTeacherDetails({
        ...teacherDetails,
        name: "",
        email: "",
        password: "",
        role: "",
        address: "",
        phone: "",
      })

    }
    else {
      toast.error(response.error);
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
      <DashboardSidebar />
      <div className="lg:ml-60 sticky top-0 bg-[#f9fafb] z-10">
        <div className="  p-2 font-bold md:text-3xl text-2xl  mx-auto text-center shadow  text-gray-50 bg-teal-500 drop-shadow mb-8 "><h1 className="text-center mx-auto">Add a teacher</h1></div></div>
      <div className='lg:ml-28 p-6  pt-6 flex justify-center w-full'>

        <div className="block p-6 rounded-lg shadow-lg bg-white w-[50rem]  mb-28">

          <div className=" mb-6">
            <label htmlFor="name" className="formLabel inline-block mb-2 text-gray-700">Name</label>
            <input onChange={handleChange} value={teacherDetails.name} name="name" type="text" className="
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
          focus:text-gray-700 focus:bg-white focus:border-teal-600 focus:outline-none" id="name"
              placeholder="Enter a name" />
          </div>


          <div className=" mb-6">
            <label htmlFor="email" className="formLabel inline-block mb-2 text-gray-700">Email</label>
            <input onChange={handleChange} value={teacherDetails.email} name="email" type="email" className="
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
          focus:text-gray-700 focus:bg-white focus:border-teal-600 focus:outline-none" id="email"
              placeholder="Enter the mail id" />
          </div>

          <div className=" mb-6">
            <label htmlFor="password" className="formLabel inline-block mb-2 text-gray-700">Password</label>
            <input onChange={handleChange} value={teacherDetails.password} name="password" type="password" className="
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
          focus:text-gray-700 focus:bg-white focus:border-teal-600 focus:outline-none" id="password"
              placeholder="Enter the password" />
          </div>



          <div className=" mb-6">
            <label htmlFor="address" className="formLabel inline-block mb-2 text-gray-700">Address</label>
            <input onChange={handleChange} value={teacherDetails.address} name="address" type="text" className="
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
          focus:text-gray-700 focus:bg-white focus:border-teal-600 focus:outline-none" id="address"
              placeholder="Enter the address" />
          </div>

          <div className=" mb-6">
            <label htmlFor="phone" className="formLabel inline-block mb-2 text-gray-700">Phone number</label>
            <input onChange={handleChange} value={teacherDetails.phone} name="phone" type="number" className="
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
          focus:text-gray-700 focus:bg-white focus:border-teal-600 focus:outline-none" id="phone"
              placeholder="Enter the phone number" />
          </div>



          <div className=" mb-6">
            <label htmlFor="role" className="formLabel inline-block mb-2 text-gray-700">Role</label>
            <select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-600 block w-48 p-2 "
              value={teacherDetails.role || 'default'}
              onChange={(e) => setTeacherDetails((pre) => ({ ...pre, role: e.target.value }))}
            >
              <option value={"default"} className="text-center" disabled>
                Select the Role
              </option>
              <option value={"Admin"} className="text-center" >
                Admin
              </option>
              <option value={"Teacher"} className="text-center" >
                Teacher
              </option>

            </select>
          </div>







          <button onClick={handleAdd} type="submit" className="
        px-6
        py-2.5
        bg-teal-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-teal-700 hover:shadow-lg
        active:bg-teal-800 active:shadow-lg
        transition
        duration-150
        ease-in-out">Add</button>



        </div></div></>
  )
}


