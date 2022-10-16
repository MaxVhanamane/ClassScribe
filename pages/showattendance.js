import React, { useState } from 'react'
import connectDb from './../middleware/mongoose';
import AttendanceRecord from '../models/attendancerecord';
export default function Attendancerecord({allStudents}) {
    console.log(allStudents)
   const [data,setData]=useState(allStudents)
 
  return (
    <div className='flex items-center justify-center'>
      
      {data.length>0?<div className="overflow-x-auto relative lg:w-3/4 w-full p-1">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-6">
        <thead className="text-xs text-gray-700 uppercase border-b border-r-0 border-collapse bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr >
                <th scope="col" className="py-3 px-2 ">
                    Roll NO.
                </th>
                <th scope="col" className="py-3 px-2">
                    Name
                </th>
                <th scope="col" className="hidden sm:block py-3 px-2">
                    Email
                </th>
                <th scope="col" className="py-3 px-2">
                    Attendance Status
                </th>
                <th scope="col" className="py-3 px-2">
                    Attendance Date
                </th>
                <th scope="col" className="py-3 px-2">
                    Attendance Time
                </th>
               
             
            </tr>
        </thead>
        <tbody>
            { data.sort((d,e)=>{return d.rollNumber-e.rollNumber }).map((item,index)=>{
                return <tr key={index} className="bg-white border-border-collapse   dark:bg-gray-800 dark:border-gray-700">
           
                 <td className="py-4 px-2">
                 {item.rollNumber}
                </td>
                <td className="py-4 px-2">
                    {item.name}
                </td>
                <td className="py-4 px-2 hidden sm:block">
                    {item.email}
                </td>
                <td className={`py-4 px-2 ${item.attendance==="present"?"text-green-500":"text-red-500"}`}>
                    {item.attendance}
                </td>
                <td className="py-4 px-2 ">
                   { new Date(`${item.date}`).toDateString({format: "%Y-%m-%d"})}
                </td>
                <td className="py-4 px-2 ">
                    {item.time}
                </td>
             
               
            </tr>
            })}
           
        </tbody>
    </table>
</div>:<div className="flex justify-center items-center shadow-sm my-20 p-10 text-red-500">No Student data found! Please add Students. </div>}


    </div>
  )
}


export async function getServerSideProps(context) {
    // Fetch data from external API
    connectDb()
    let className = (context.query.className);
    let division = (context.query.division);

    let students = await AttendanceRecord.find({className:className,division:division})
    
    return { props: { allStudents:JSON.parse(JSON.stringify(students)),className:className } }
  }
