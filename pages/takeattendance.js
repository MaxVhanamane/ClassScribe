import Head from 'next/head'
import { useState,useEffect} from 'react'
import Student from './../models/students';
import connectDb from './../middleware/mongoose';
import { toast } from 'react-toastify';
import {BiRadioCircleMarked} from "react-icons/bi"
import {HiCheckCircle} from "react-icons/hi"
export default function TakeAttendance({allStudents,className}) {
const [incomingData,setIncomingData]=useState(allStudents)
const newD=incomingData.map((d)=>{
  d.status="pending"
  return d
})
const [data,setData]=useState(newD)

useEffect(()=>{
  localStorage.setItem("localData",JSON.stringify(newD))
},[])

const getIndianTime=()=>{
  const currentTime = new Date().getTime();
const indianTimeZoneOffset = 330 * 60 * 1000; // 330 minutes
const indianDate = new Date(currentTime + indianTimeZoneOffset);
const indianDateString = indianDate.toISOString();
return indianDateString
}

  const handleClick=async(attendance,studentInfo)=>{
//update status 
let getStatus=JSON.parse(localStorage.getItem("localData"))
   const index = getStatus.findIndex(item => item.name === studentInfo.name);
   if(index !== -1) {
    getStatus[index] = { ...getStatus[index], status:"done" };
    localStorage.setItem("localData",JSON.stringify(getStatus))
    setData([...JSON.parse(localStorage.getItem("localData"))])
  }

// send mail 
    let emailData={name:studentInfo.name,email:studentInfo.email,attendance:attendance}
    let res=await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/sendmail`, { 
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })

   let mailResponse=await res.json()

  if(mailResponse.success){
    
      toast.success('Email sent successfully!', {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  }
  else{
    toast.error('Some error occurred, Please try again!', {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
// add attendance
// as we are living in india so while adding the date we will add it in ISO format date:new Date().toISOString() 
const studentInformation = {_id:studentInfo._id,email:studentInfo.email,className:studentInfo.className,division:studentInfo.division,rollNumber:studentInfo.rollNumber,attendance:attendance,date:getIndianTime(),time:new Date().toLocaleTimeString(),
  genRegNumber:studentInfo.genRegNumber,caste:studentInfo.caste,subCaste:studentInfo.subCaste,DOB:studentInfo.DOB,phone:studentInfo.phone};
     
   const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addattendance`, {
     method: 'POST', // or 'PUT'
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(studentInformation),
   })
   const fresponse = await response.json()




  }

  return (
    <div >
      <Head>
        <title>Attendance</title>
        <meta name="description" content="Student attendance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=' flex items-center justify-center flex-col'>
        
        <h1 className= "w-full fixed mt-36 text-center p-2 text-white font-bold text-lg bg-teal-500">Student list for class {className}</h1>
     
        {data.length>0?<div className="fixed top-[6.5rem]  h-[calc(100vh-6.5rem)] overflow-auto lg:w-3/4 w-full ">
          <div className="mb-16">
    <table className="w-full text-sm text-left text-gray-500   ">
        <thead className="text-xs sticky top-0 text-center md:text-left text-gray-700 uppercase  border-collapse bg-gray-50 ">
            <tr >
                <th scope="col" className="py-3 px-2 text-center">
                    R.No.
                </th>
                <th scope="col" className="py-3 px-2">
                    Name
                </th>
                <th scope="col" className="hidden sm:block py-3 px-2">
                    Email
                </th>
                <th scope="col" className="py-3 px-2">
                    Present
                </th>
                <th scope="col" className="py-3 px-2">
                    Absent
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                    Status
                </th>
             
            </tr>
        </thead>
        <tbody>
            { data.sort((d,e)=>{return d.rollNumber-e.rollNumber }).map((item,index)=>{
                return <tr key={index} className="bg-white">
           
                 <td className="py-4 px-2 ">
                 <div className="flex items-center justify-center ">{item.rollNumber}</div>
                </td>
                <td className="py-4 px-2">
                    {item.name}
                </td>
                <td className="py-4 px-2 hidden sm:block">
                    {item.email}
                </td>
                <td className="py-4 px-2">
                <button onClick={(e)=>{handleClick(e.target.value,item)} }className=" bg-emerald-600 hover:bg-emerald-700 text-white rounded p-1 px-2 hover:shadow" value="P" >Present</button>
                </td>
                <td className="py-4 px-2">
                <button onClick={(e)=>{handleClick(e.target.value,item)} } className="bg-red-500 hover:bg-red-600 hover:shadow text-white rounded p-1 px-2" value="A">Absent</button>
                </td>
                <td className="py-4 px-2 ">
                    {/* <div  > */}
                      {item.status==="done"?<HiCheckCircle className={`w-4 h-4  text-emerald-600 rounded-full mx-auto`}/>:<BiRadioCircleMarked className={`w-5 h-5 text-red-600 rounded-full mx-auto`}/>}
                    {/* </div> */}
                </td>
            </tr>
            })}
           
        </tbody>
    </table>
    </div>
</div>:<div className="fixed top-36 flex justify-center items-center font-semibold my-20 p-10 text-red-500">No Student records found! Please add Students. </div>}







{/* 
        <div className="flex border-2 border-blue-500 shadow w-3/4 p-4 mt-4 items-center justify-center flex-col">
       
        {data.length>0? data.map((item,index)=>{
          return<div className='flex gap-4 border-2 py-2 items-center justify-center my-4 w-fit px-6 ' key={index}>
             <p >{item.rollNumber}</p>

             <p >{item.name}</p>
             <p >{item.email}</p>
             <button onClick={(e)=>{handleClick(e.target.value,item)} }className="bg-green-700 text-white rounded p-1 px-2" value="present" >Present</button>
             <button onClick={(e)=>{handleClick(e.target.value,item)} } className="bg-red-500 text-white rounded p-1 px-2" value="absent">Absent</button>
             </div> 
        }):<div className="flex justify-center items-center shadow-sm my-20 p-10 text-red-500">No Student data found! Please add Students. </div>}
</div> */}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}




export async function getServerSideProps(context) {
    // Fetch data from external API
    connectDb()
    let className = (context.query.className);
    let division = (context.query.division);

    let students = await Student.find({className:className,division:division})
 
    return { props: { allStudents:JSON.parse(JSON.stringify(students)),className:className } }
  }
  
