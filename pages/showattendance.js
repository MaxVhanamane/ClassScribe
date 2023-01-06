import React, { useState } from 'react'
import connectDb from './../middleware/mongoose';
import Student from '../models/students';
import { jsPDF } from "jspdf";
import DatePicker from "react-datepicker";
import autoTable from 'jspdf-autotable';
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/router';
export default function Attendancerecord({ allStudents, classNameValue }) {
    const router = useRouter();
    const { className, division } = router.query;
    const [data, setData] = useState([])
    const [studentDetails, setStudentDetails] = useState(allStudents)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showAttendace, setShowAttendance] = useState(false)
    let dates = data.map((item) => {
        return parseInt(item.date.split("T")[0].split("-")[2])
    })
    let uniqueDates = [...new Set(dates.sort())];

    let impData = studentDetails.sort((d, e) => { return d.rollNumber - e.rollNumber }).map((item, index) => {

        let b = data?.filter(x => { return x.name === item.name }).sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        })
        if(b.length===0){
            b.push({name:item.name})
        }
        if (b.length != uniqueDates.length) {
            let newArray = uniqueDates.slice(0, uniqueDates.length - b.length);
            newArray.forEach(() => {
                b.unshift("Max")
            })

        }
        return b
    })


    const getData = async () => {

        let sDate = new Date(startDate).toISOString().substring(0, 10) + "T00:00:00Z"
        let eDate = new Date(endDate).toISOString().substring(0, 10) + "T23:59:59Z"
        let data = { sDate, eDate, className, division }
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getdatewisedata`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        let studentsData = await res.json()
        setData(() => studentsData.students)
        setShowAttendance(true)
    }

    const getPdf = async () => {
        let doc = new jsPDF("l", "pt", "a3");
        autoTable(doc, { html: "#table_pdf", theme: "grid" })
        let fileName = `class-${classNameValue}-Attendance`
        doc.save(fileName);

    }
    return (
        <>
            <div className='w-full flex items-center justify-center flex-col md:flex-row fixed top-[3.25rem] z-10 bg-gray-50  border-b border-gray-800 pb-6 pt-4'>
                <div className="flex gap-1">
                    <div className='flex flex-col md:flex-row gap-2 md:mx-2'>

                        <p className='my-auto mx-2 md:mx-auto'>Start Date:</p>
                        <div>
                            <DatePicker dateFormat="dd/MM/yyyy" className='bg-gray-100 text-center w-32 md:w-40 border-2 rounded border-gray-700' selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-2'>
                        <p className='my-auto mx-2 md:mx-auto'>End Date:</p>
                        <div>
                            <DatePicker dateFormat="dd/MM/yyyy" className='bg-gray-100  text-center w-32 md:w-40 border-2 rounded border-gray-700' selected={endDate} onChange={(date) => setEndDate(date)} />
                        </div>
                    </div>
                </div>
                <div className='flex mt-2 md:mt-auto'>
                    <button className='m-2  text-center bg-violet-900 text-white rounded p-0.5 px-1' onClick={getData}>Get attendance</button>
                    <button className='m-2  text-center bg-violet-900 text-white rounded p-0.5 px-1' onClick={getPdf}>Download pdf</button>
                </div>

            </div>
            <div>

                <h1 className='fixed top-36 w-full text-center font-bold  text-gray-800 lg:text-3xl text-xl mb-1 pb-4 '>{`Attendance of grade ${classNameValue}  students`} </h1>

            </div>
            {showAttendace ? <div>
                {data.length > 0 ? <div className=" fixed top-52 h-[calc(100vh-13rem)]  overflow-auto  w-full  lg:px-12 mb-20" >
                    <div className="pb-16">
                        <table className=" w-full overflow-auto text-sm text-left text-gray-500 " id="table_pdf" >

                            <thead className="sticky top-0 text-xs  w-screen text-gray-700 uppercase  bg-gray-50  ">
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
                                        Caste
                                    </th>
                                    <th scope="col" className="py-3 px-2 text-center">
                                        Subcaste
                                    </th>
                                    <th scope="col" className="py-3 px-2 text-center">
                                        R.No
                                    </th>
                                    <th scope="col" className="py-3 px-2 text-center">
                                        Name
                                    </th>

                                    {/* <th scope="col" className="py-3 px-2 text-center">
                    P/A
                </th> 
                <th scope="col" className="py-3 px-2 text-center">
                    Att. Date
                </th> */}

                                    {uniqueDates.map((item) => {
                                        return <th key={item} scope="col" className="py-3 px-2 text-center"> {item} </th>
                                    })}

                                    <th scope="col" className="py-3 px-2 text-center">
                                        Present days
                                    </th>
                                    <th scope="col" className="py-3 px-2 text-center">
                                        Absent days
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="font-semibold ">
                                {/* data.sort((a,b)=>{return new Date(a.date) - new Date(b.date) }) */}
                                {/* { data.sort((d,e)=>{return d.rollNumber-e.rollNumber }).map((item,index)=>{
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
      
            })} */}




                                {studentDetails.sort((d, e) => { return d.rollNumber - e.rollNumber }).map((item, index) => {
                                    return <tr key={index} className="bg-white border-border-collapse   ">

                                        <td className="py-4 px-2 text-center">
                                            {index + 1}
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
                                        {/* // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero. */}
                                        {/* {     console.log(  data.filter(x => { return x.name === item.name }).sort(function(a,b){
 
  return new Date(a.date) - new Date(b.date);
}))} */}

                                        {/* {console.log(data.filter(x => { return x.name === item.name }))} */}



                                        {impData?.find(array => {
                                            return array?.find(obj => obj.name === item.name)
                                        }).map((i, index) => {
                                            return <td key={index} className={`py-4 ${i.attendance === "NT" ? "text-red-600" : null} font-semibold px-2 text-center`}>
                                                {i.attendance}
                                            </td>
                                        })}

                                        <td className="py-4 px-2 text-center">
                                            {
                                                data.filter(x => { return x.name === item.name }).filter(item => item.attendance === 'P').length
                                            }
                                        </td>

                                        <td className="py-4 px-2 text-center">
                                            {
                                                data.filter(x => { return x.name === item.name }).filter(item => item.attendance === 'A').length
                                            }
                                        </td>


                                    </tr>

                                })}

                            </tbody>
                        </table>
                    </div>
                </div> : <div className="flex justify-center items-center font-semibold fixed w-full my-52 py-10 px-4 text-red-500">No attendance records found! </div>}


            </div> : <div className="flex justify-center font-semibold items-center fixed w-full my-52 py-10 px-4 text-violet-900 animate-pulse">Select the date range to view attendance. </div>}
        </>
    )
}


export async function getServerSideProps(context) {
    // Fetch data from external API
    connectDb()
    let classNameValue = (context.query.className);
    let division = (context.query.division);
    let studentNames = await Student.find({ className: classNameValue, division: division })
    return { props: { allStudents: JSON.parse(JSON.stringify(studentNames)), classNameValue: classNameValue } }
}
