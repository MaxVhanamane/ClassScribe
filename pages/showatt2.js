import React, { useState } from 'react'
import connectDb from './../middleware/mongoose';
import AttendanceRecord from '../models/attendancerecord';
import { jsPDF } from "jspdf";
import DatePicker from "react-datepicker";
import autoTable from 'jspdf-autotable';
import "react-datepicker/dist/react-datepicker.css";
export default function Attendancerecord({allStudents,classNameValue}) {
   const [data,setData]=useState(allStudents)
   const [startDate, setStartDate] = useState(new Date());
   const [endDate, setEndDate] = useState(new Date());
//   console.log(startDate)
//   console.log("start",new Date(startDate).toISOString().substring(0, 10))
//   console.log("end",new Date(endDate).toISOString().substring(0, 10))
//    console.log("endDate",endDate.toLocaleDateString().slice(0,10))
//   console.log("startdate",startDate.toLocaleDateString().slice(0,10))

  const getData=async()=>{
    let sDate=new Date(startDate).toISOString().substring(0, 10)+"T00:00:00Z"
    let eDate=new Date(endDate).toISOString().substring(0, 10)+"T23:59:59Z"
    let data={sDate,eDate}
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getdatewisedata`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      let studentsData=await res.json()
      setData((d)=>studentsData.students)
  }

  const getPdf=async()=>{
    let doc = new jsPDF("l","pt","a4");
    autoTable(doc,{html:"#table_pdf",theme:"grid"})
    let fileName=`class-${classNameValue}-Attendance`
    doc.save(fileName);
    
// doc.html(document.querySelector("#table_pdf"), {
//    callback: function (doc) {
//      doc.save("max");
//    },
//    x:50,
//    y:10,
//    width: 1000,
//    windowWidth: 1000,
// });
  }
  return (
    <>
   <div className='mt-16 flex items-center justify-center flex-col md:flex-row  border-b border-gray-800 pb-6'>
    <div className='flex flex-col md:flex-row '>
       
        <p className='my-auto mx-2 md:mx-auto'>Start Date:</p>
        <div>
          <DatePicker className='bg-gray-100 text-center m-2 border-2 rounded border-gray-700' selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          </div>

          <div className='flex flex-col md:flex-row '>
        <p className='my-auto mx-2 md:mx-auto'>End Date:</p>
        <div>
          <DatePicker className='bg-gray-100  text-center m-2 border-2 rounded border-gray-700' selected={endDate} onChange={(date) => setEndDate(date)} />
          </div>
          </div>
      <div className='flex mt-2 md:mt-auto'> 
          <button className='m-2  text-center bg-violet-900 text-white rounded p-0.5 px-1' onClick={getData}>Get attendance</button>
          <button className='m-2  text-center bg-violet-900 text-white rounded p-0.5 px-1' onClick={getPdf}>Download pdf</button>
          </div>
          </div>
        <h1 className='text-center font-bold text-gray-800 mt-8 lg:text-3xl text-xl mb-4 pb-4'>{`Attendance of grade ${classNameValue}  students`} </h1>
    <div className='flex items-center justify-center'>
      {data.length>0?<div className="overflow-x-auto relative  w-full p-1 lg:px-12 mb-20" >
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-6" id="table_pdf" >
        <thead className="text-xs text-gray-700 uppercase border-b border-r-0 border-collapse bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr >
                <th scope="col" className="py-3 px-2 text-center">
                   Sr.No
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                   GR.No
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                   DOB
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                   caste
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                   subcaste
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                    R.No
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                    Name
                </th>
                
                <th scope="col" className="py-3 px-2 text-center">
                    P/A
                </th>
                <th scope="col" className="py-3 px-2 text-center">
                    Att. Date
                </th>
               
               
             
            </tr>
        </thead>
        <tbody>
        {/* data.sort((a,b)=>{return new Date(a.date) - new Date(b.date) }) */}
            { data.sort((d,e)=>{return d.rollNumber-e.rollNumber }).map((item,index)=>{
                return <tr key={index} className="bg-white border-border-collapse   dark:bg-gray-800 dark:border-gray-700">
           
                 <td className="py-4 px-2 text-center">
                    {index+1}
                </td>
                 <td className="py-4 px-2 text-center">
                    {item.genRegNumber}
                </td>
                 <td className="py-4 px-2 text-center">
                    {new Date(item.DOB).toLocaleDateString('en-GB')}
                </td>
                <td className="py-4 px-2 text-center">
                    {item.caste}
                </td>
                <td className="py-4 px-2 text-center">
                    {item.subCaste}
                </td>
                 <td className="py-4 px-2 text-center">
                 {item.rollNumber}
                </td>
                <td className="py-4 px-2 text-center">
                    {item.name}
                </td>
               
                <td className={`py-4 px-2 text-center ${item.attendance==="present"?"text-green-500":"text-red-500"}`}>
                    {item.attendance}
                </td>
                <td className="py-4 text-center px-2 ">
                   { new Date(item.date).toLocaleDateString('en-GB')}
                </td>
            
             
            </tr>
      
            })}
           
        </tbody>
    </table>
</div>:<div className="flex justify-center items-center shadow-sm my-20 p-10 text-red-500">No student records found! Please add Students. </div>}


    </div>
    </>
  )
}


export async function getServerSideProps(context) {
    // Fetch data from external API
    connectDb()
    let classNameValue = (context.query.className);
    let division = (context.query.division);

    let students = await AttendanceRecord.find({className:classNameValue,division:division})

    return { props: { allStudents:JSON.parse(JSON.stringify(students)),classNameValue:classNameValue } }
  }
