import Head from 'next/head'
import { useState, useEffect } from 'react'
import Student from './../../models/students';
import connectDb from './../../middleware/mongoose';
import { toast } from 'react-toastify';
import DashboardSidebar from '../../components/DashboardSidebar';
export default function ViewAllStudents({ allStudents }) {

  const [data, setData] = useState(allStudents)
  const [showModal, setShowModal] = useState(false);

  let classNm = data.map((cl) => { return cl.className })
  let uniqueclassNm = [...new Set(classNm)].sort(function (a, b) { return a - b; });

// Edit student details
const [studentDetails,setStudentDetails]=useState({
    _id:"",
    name: "",
    email: "",
    phone:"",
    className: "",
    division:"",
    rollNumber: "",
    genRegNumber:"",
    DOB:"",
    caste:"",
    subCaste:""
 

})


  const [selectClass, setSelectClass] = useState();
  const [selectDivisionName, setselectDivisionName] = useState();
  // const [uniqueDivisionName, setuniqueDivisionName] = useState();


  let division = data.map((div) => { return div.division })
  let uniqueDivisionName= [...new Set(division)].sort()

  // putting uniqueDivisionName in useEffect. because if I write it like uniqueclassNm then it will give you hydration error.
  // useEffect(() => {
  //   setuniqueDivisionName([...new Set(division)])
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const handleSearch = async () => {


    let data = { className: selectClass, division: selectDivisionName }
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getstudents`, {
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


    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getstudents`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })

    let foundStudents = await response.json()
    setData(foundStudents.students)

  }

const handleDeleteStudent=async(item)=>{

let data =item
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deletestudent`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let result = await response.json()
    if(result.success){
      toast.success('Student details deleted successfully!', {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // if the user has not slected the class and division, then after deleting the student informatin we will show all the students data by calling handleViewAll.
      //If the user has selected the class and the division, we will only show that class data to the user by calling handleSearch.
      if(!selectClass || !selectDivisionName ){
        handleViewAll()
      }
      else{
        handleSearch()

      }
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

// Edit student details

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

  else if(e.target.name==="phone"){
setStudentDetails({
             ...studentDetails  ,
             phone:e.target.value 
      })
  }


  else if(e.target.name==="genRegNumber"){             
setStudentDetails({
             ...studentDetails  ,
             genRegNumber:e.target.value 
      })
  }

  else if(e.target.name==="DOB"){
setStudentDetails({
             ...studentDetails  ,
             DOB:e.target.value 
      })
  }

  else if(e.target.name==="caste"){
setStudentDetails({
             ...studentDetails  ,
             caste:e.target.value 
      })
  }

  else if(e.target.name==="subCaste"){
setStudentDetails({
             ...studentDetails  ,
             subCaste:e.target.value 
      })
  }

  
}
const handleEdit=async()=>{
  const data = {_id:studentDetails._id,name:studentDetails.name,email:studentDetails.email,className:studentDetails.className,division:studentDetails.division,rollNumber:studentDetails.rollNumber,phone:studentDetails.phone,genRegNumber:studentDetails.genRegNumber,DOB:new Date(studentDetails.DOB),caste:studentDetails.caste,subCaste:studentDetails.subCaste};
   

  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/editstudentdetails`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const response = await res.json()
  if(response.success){
      toast.success('Student details updated successfully!', {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
   // if the user has not slected the class and division, then after updating the student informatin we will show all the students data by calling handleViewAll.
      //If the user has selected the class and the division, we will only show that class data to the user by calling handleSearch.
      if(!selectClass || !selectDivisionName ){
        handleViewAll()
      }
      else{
        handleSearch()

      }

  }
  else{
    toast.success('Some error occured, please try again later!', {
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



        <div className='flex flex-row gap-2 items-center justify-center px-1'>

          <div className='mt-6'>
            {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 text-center">Select the Class</label> */}
            <div className='mt-2'>
              <select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              <select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectDivisionName}
                defaultValue={"default"}
                onChange={(e) => setselectDivisionName(e.target.value)}
              >
                <option value={"default"} className="text-center" disabled>
                  Select the division

                </option>
                {uniqueDivisionName && uniqueDivisionName.map((div, ind) => { return <option key={div} className="text-center" value={div}>{div}</option> })}

              </select>
            </div>

          </div>




          <div className=" flex mt-6 gap-2 ">

            <button onClick={handleSearch} className="bg-emerald-500 p-1.5 rounded text-white mt-2"  >
              Search
            </button>

            <button onClick={handleViewAll} className="hidden md:block bg-emerald-500 p-1.5 rounded text-white mt-2"  >
              View All
            </button>

          </div>


        </div>





        {data.length > 0 ? <div className="overflow-x-auto relative  w-full p-1 lg:p-4">
          
        <p onClick={handleViewAll} className="md:hidden text-right pr-2 text-blue-700 mt-2 hover:text-blue-600"  >
              View All students
            </p>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
            <thead className="text-xs text-gray-700 uppercase border-b border-r-0 border-collapse bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr >
                <th scope="col" className="py-3 px-2 md:px-2  text-center ">
                  GR No.
                </th>
                <th scope="col" className="py-3 px-2 md:px-2  text-center ">
                 DOB
                </th>
                <th scope="col" className="py-3 px-1 md:px-2  text-center">
                  Caste
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 text-center ">
                  Subcast
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 text-center">
                  Name
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 text-center">
                  R.No
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 text-center">
                  Class
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 text-center">
                  Division
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 text-center">
                  Email
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 text-center">
                  Phone
                </th>
              
                <th scope="col" className="py-3 px-1 md:px-2 text-center">
                  Action
                </th>
                


              </tr>
            </thead>
            <tbody>
              {data.sort((d, e) => { return d.rollNumber - e.rollNumber }).map((item, index) => {
                return <tr key={index} className="bg-white border-border-collapse   dark:bg-gray-800 dark:border-gray-700">

                  <td className="py-4 px-2 md:px-2 text-center">
                    {item.genRegNumber}
                  </td>

                  <td className="py-4 px-2 md:px-2 text-center">
                    {new Date(item.DOB).toLocaleDateString('en-GB')}
                  </td>

                  <td className="py-4 px-2 md:px-2 text-center">
                    {item.caste}
                  </td>

                  <td className="py-4 px-2 md:px-2 text-center">
                    {item.subCaste}
                  </td>

        
                  <td className="py-4 px-1 md:px-2 text-center">
                    {item.name}
                  </td>

                  <td className="py-4 px-1 md:px-2 text-center">
                    {item.rollNumber}
                  </td>
                  <td className="py-4 px-1 md:px-2 text-center">
                    {item.className}
                  </td>

                  <td className="py-4 px-1 md:px-2 text-center">
                    {item.division}
                  </td>

                  <td className="py-4 px-1 md:px-2 text-center">
                    {item.email}
                  </td>
                  <td className="py-4 px-1 md:px-2 text-center">
                    {item.phone}
                  </td>

                 

                  <td className="py-4 px-2 md:px-2 text-center">
                    <div className="flex space-x-2 items-center justify-center">
                    
                    <button onClick={(e) => { 
                     let DateVal=new Date(item.DOB).toISOString().split("T")[0]
                           setStudentDetails((prev)=>{
                            return {...prev, 
                            _id:item._id ,
                            name: item.name,
                            email: item.email,
                            phone:item.phone,
                            className:item.className,
                            division:item.division,
                            rollNumber: item.rollNumber,
                            genRegNumber:item.genRegNumber,
                            DOB:DateVal,
                           caste:item.caste,
                           subCaste:item.subCaste}
                           })

                      setShowModal(true)

                       }} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded py-0.5 px-1  md:px-2 md:py-1" >Edit</button>

<button onClick={(e) => { 
                      let confirmVal=confirm("Do you really want to delete?")
                      if(confirmVal){
                        handleDeleteStudent(item)
                      }
                       }} className="bg-red-500 hover:bg-red-600 text-white rounded py-0.5 px-1  md:px-2 md:py-1" >Delete</button>
                       </div>
                  </td>
                  
                </tr>
              })}

            </tbody>
          </table>
        </div> : <div className="flex justify-center items-center shadow-sm my-20 p-10 text-red-500">No Student records found! Please add Students. </div>}




        



      </main>


    </div>
    {showModal && (


      <div className="lg:ml-60 bg-gray-100 h-fit absolute inset-0 flex items-center justify-center z-[120] ">
      
      <div className="bg-violet-900 mt-12  rounded-lg mb-10">
        {/* heading */}
      <div className="text-center font-bold text-xl mt-4 border-b border-solid border-slate-200">
        <h2 className="mb-2 text-gray-100">Edit the student details</h2>
        </div>
          {/* body */}
          <div>
          <div className='p-6  pt-6 flex justify-center w-full'>
    
    <div className="block p-6 rounded-lg shadow-lg bg-white lg:w-[50rem] w-80 md:w-[40rem]  mb-12">
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
        <label htmlFor="phone"  className="formLabel inline-block mb-2 text-gray-700">Phone</label>
        <input onChange={handleChange} value={studentDetails.phone} name="phone" type="number" className="form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="phone"
          placeholder="Enter the phone number"/>
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
      
     
     
      <div className="form-group mb-6">
        <label htmlFor="genRegNumber"  className="formLabel inline-block mb-2 text-gray-700">General register number</label>
        <input onChange={handleChange} value={studentDetails.genRegNumber} name="genRegNumber" type="number" className="form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="genRegNumber"
          placeholder="Enter general register number"/>
      </div>
     
     
      <div className="form-group mb-6">
        <label htmlFor="DOB"  className="formLabel inline-block mb-2 text-gray-700">Date of birth</label>
        <input onChange={handleChange} value={studentDetails.DOB} name="DOB" type="date" className="form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="DOB"
          placeholder="Enter date of birth"/>
      </div>
      
     
      <div className="form-group mb-6">
        <label htmlFor="caste"  className="formLabel inline-block mb-2 text-gray-700">Caste</label>
        <input onChange={handleChange} value={studentDetails.caste} name="caste" type="text" className="form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="caste"
          placeholder="Enter caste"/>
      </div>
      
     
      <div className="form-group mb-6">
        <label htmlFor="subCaste"  className="formLabel inline-block mb-2 text-gray-700">Subcast</label>
        <input onChange={handleChange} value={studentDetails.subCaste} name="subCaste" type="text" className="form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="subCaste"
          placeholder="Enter subcaste"/>
      </div>
            
           
            
            
          
        
      
      
      
       </div>
                      </div>
      
      
          </div>
          {/* footer */}
         
      
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                          className="bg-red-500 text-white hover:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                        
                          className="bg-emerald-500 text-white hover:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {handleEdit()
                          
                          
                          
                          }}
                        >
                          Save Changes
                        </button>
                      </div>
      
       
      
        </div>
      
      </div>
      
      
         )}
    </>
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

