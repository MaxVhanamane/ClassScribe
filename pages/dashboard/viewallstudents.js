import Head from 'next/head'
import { useState, useEffect } from 'react'
import Student from './../../models/students';
import connectDb from './../../middleware/mongoose';
import { toast } from 'react-toastify';
import DashboardSidebar from '../../components/DashboardSidebar';
export default function ViewAllStudents({ allStudents }) {

  const [data, setData] = useState(allStudents)


  let classNm = allStudents.map((cl) => { return cl.className })
  let uniqueclassNm = [...new Set(classNm)].sort(function (a, b) { return a - b; });




  const [selectClass, setSelectClass] = useState();
  const [selectDivisionName, setselectDivisionName] = useState();
  const [uniqueDivisionName, setuniqueDivisionName] = useState();


  let division = allStudents.map((div) => { return div.division })
  // let uniqueDivisionName= [...new Set(division)]

  // putting uniqueDivisionName in useEffect. because if I write it like uniqueclassNm then it will give you hydration error.
  useEffect(() => {
    setuniqueDivisionName([...new Set(division)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = async () => {


    let data = { className: selectClass, division: selectDivisionName }
    let response = await fetch('http://localhost:3000/api/getstudents', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let foundStudents = await response.json()
    setData(foundStudents.students)



  }

  const handleViewAll = async () => {


    let response = await fetch('http://localhost:3000/api/getstudents', {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })

    let foundStudents = await response.json()
    console.log("ye viewall", foundStudents)
    setData(foundStudents.students)

  }

const handleDeleteStudent=async(item)=>{

let data =item
    let response = await fetch('http://localhost:3000/api/deletestudent', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let result = await response.json()
    console.log("resusl",result)
    if(result.success){
      toast.success('Student details deleted successfully!', {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleSearch()
    }
    else{
      toast.error('Student details not found!', {
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
    <div >
          <style jsx global>{`
       footer{
        display:none;
       }
       nav{
        display:none;
       }
      `}</style>
      <Head>
        <title>Attendance</title>
        <meta name="description" content="Student attendance" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  <DashboardSidebar/>
      <main className=' flex items-center justify-center flex-col lg:ml-60 sticky top-0 bg-[#f9fafb] z-10'>
        <h1 className="w-full  text-center p-3 text-white font-bold text-lg bg-violet-900">Student list </h1>



        <div className='flex flex-row gap-2 items-center justify-center'>

          <div className='mt-6'>
            {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 text-center">Select the Class</label> */}
            <div className='mt-2'>
              <select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectClass}
                defaultValue={"default"}
                onChange={(e) => setSelectClass(e.target.value)}
              >
                <option value={"default"} className="text-center" disabled>
                  Select the class

                </option>
                {uniqueclassNm.map((cls) => { return <option key={cls} className="text-center" value={cls}>{cls}</option> })}

              </select>
            </div>

          </div>

          <div className='mt-6'>
            {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 text-center">Select the Class</label> */}
            <div className='mt-2'>
              <select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectDivisionName}
                defaultValue={"default"}
                onChange={(e) => setselectDivisionName(e.target.value)}
              >
                <option value={"default"} className="text-center" disabled>
                  Select the division

                </option>
                {uniqueDivisionName && uniqueDivisionName.map((cls, ind) => { return <option key={ind} className="text-center" value={cls}>{cls}</option> })}

              </select>
            </div>

          </div>




          <div className=" flex mt-6 gap-2 ">

            <button onClick={handleSearch} className="bg-green-600 p-2 rounded text-white mt-2"  >
              Search
            </button>

            <button onClick={handleViewAll} className="hidden md:block bg-green-600 p-2 rounded text-white mt-2"  >
              View All
            </button>

          </div>


        </div>





        {data.length > 0 ? <div className="overflow-x-auto relative lg:w-3/4 w-full p-1">
          
        <p onClick={handleViewAll} className="md:hidden text-right pr-2 text-blue-700 mt-2 hover:text-blue-600"  >
              View All students
            </p>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
            <thead className="text-xs text-gray-700 uppercase border-b border-r-0 border-collapse bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr >
                <th scope="col" className="py-3 px-2 md:px-2 ">
                  Roll NO.
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 ">
                  Class Name
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 ">
                  Division
                </th>
                <th scope="col" className="py-3 px-1 md:px-2">
                  Name
                </th>
                <th scope="col" className="hidden sm:block py-3 px-1 md:px-2">
                  Email
                </th>
                <th scope="col" className="py-3 px-1 md:px-2">
                  Action
                </th>


              </tr>
            </thead>
            <tbody>
              {data.sort((d, e) => { return d.rollNumber - e.rollNumber }).map((item, index) => {
                return <tr key={index} className="bg-white border-border-collapse   dark:bg-gray-800 dark:border-gray-700">

                  <td className="py-4 px-2 md:px-2">
                    {item.rollNumber}
                  </td>
                  <td className="py-4 px-1 md:px-2">
                    {item.className}
                  </td>
                  <td className="py-4 px-1 md:px-2">
                    {item.division}
                  </td>
                  <td className="py-4 px-1 md:px-2">
                    {item.name}
                  </td>
                  <td className="py-4 px-1 md:px-2 hidden sm:block">
                    {item.email}
                  </td>

                  <td className="py-4 px-2 md:px-2">
                    <button onClick={(e) => { handleDeleteStudent(item) }} className="bg-red-500 hover:bg-red-600 text-white rounded p-1  md:p-2" >Delete</button>
                  </td>
                </tr>
              })}

            </tbody>
          </table>
        </div> : <div className="flex justify-center items-center shadow-sm my-20 p-10 text-red-500">No Student data found! Please add Students. </div>}








      </main>


    </div>
  )
}




export async function getServerSideProps(context) {
  // Fetch data from external API
  connectDb()
  // let className = (context.query.className);
  // let division = (context.query.division);

  let students = await Student.find({})

  return { props: { allStudents: JSON.parse(JSON.stringify(students)) } }
}

