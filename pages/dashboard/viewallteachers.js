import Head from 'next/head'
import { useState, useEffect } from 'react'
import User from './../../models/users';
import connectDb from './../../middleware/mongoose';
import { toast } from 'react-toastify';
import DashboardSidebar from '../../components/DashboardSidebar';
export default function ViewAllTeachers({ allTeachers }) {

  const [data, setData] = useState(allTeachers)
  const [showModal, setShowModal] = useState(false);

  let roles = data.map((role) => { return role.role })
  let uniqueroleNames = [...new Set(roles)]



  const [roleName, setRoleName] = useState();

  const [teacherDetails,setTeacherDetails]=useState({
    _id:"",
    name: "",
    email: "",
    role: "",
    address:"",
    phone: "",
   
  
})

// handle Search
  const handleSearch = async () => {


    let data = { role:roleName}
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getteachers`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let foundTeachers = await response.json()
    setData(foundTeachers.teachers)



  }

  // view all teachers
  const handleViewAll = async () => {


    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getteachers`, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
    })

    let foundTeachers = await response.json()
    setData(foundTeachers.teachers)

  }


const handleDeleteTeacher=async(item)=>{

let data ={_id:item._id}
    let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteteacher`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let result = await response.json()
    if(result.success){
      toast.success('Teacher details deleted successfully!', {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // if the user has not slected the role, then after deleting the teacher informatin we will show all the teachers data by calling handleViewAll.
      //If the user has selected the role, we will only show that role data to the user by calling handleSearch.
      if(!roleName ){
        handleViewAll()
      }
      else{
        handleSearch()

      }
    }
    else{
      toast.error('Teacher details not found!', {
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
}


const handleEdit=async()=>{
  const data = {_id:teacherDetails._id,name:teacherDetails.name,email:teacherDetails.email,role:teacherDetails.role,phone:teacherDetails.phone,address:teacherDetails.address};
   

  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/editteacherdetails`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  const response = await res.json()
  if(response.success){
      toast.success('Teacher details updated successfully!', {
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
   // if the user has not slected the class and division, then after updating the student informatin we will show all the students data by calling handleViewAll.
      //If the user has selected the class and the division, we will only show that class data to the user by calling handleSearch.
      if(!roleName ){
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





  const handleChange=(e)=>{
    if(e.target.name==="name"){
        setTeacherDetails({
               ...teacherDetails  ,
               name:e.target.value 
        })
    }

    else if(e.target.name==="email"){
        setTeacherDetails({
            ...teacherDetails  ,
            email:e.target.value 
     })
    }

    else if(e.target.name==="role"){
 setTeacherDetails({
               ...teacherDetails  ,
               role:e.target.value 
        })
    }

    else if(e.target.name==="address"){
 setTeacherDetails({
               ...teacherDetails  ,
               address:e.target.value 
        })
    }


    else if(e.target.name==="phone"){
 setTeacherDetails({
               ...teacherDetails  ,
               phone:e.target.value 
        })
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
        <h1 className="w-full  text-center p-3 text-white font-bold text-lg bg-violet-900">Teacher&apos;s list </h1>



        <div className='flex flex-row gap-2 items-center justify-center px-1'>

          <div className='mt-6'>
            {/* <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 text-center">Select the Class</label> */}
            <div className='mt-2'>
              <select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={roleName}
                defaultValue={"default"}
                onChange={(e) => setRoleName(e.target.value)}
              >
                <option value={"default"} className="text-center" disabled>
                  Select the Role

                </option>
                {uniqueroleNames.map((role) => { return <option key={role} className="text-center" value={role}>{role}</option> })}

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
              View All teachers
            </p>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
            <thead className="text-xs text-gray-700 uppercase border-b border-r-0 border-collapse bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr >
                <th scope="col" className="py-3 px-2 md:px-2  text-center ">
                  Name
                </th>
                <th scope="col" className="py-3 px-1 md:px-2  text-center">
                  Email
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 text-center ">
                  Phone
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 text-center">
                  Role
                </th>
                <th scope="col" className="py-3 px-1 md:px-2 text-center">
                  Address
                </th>
               
                <th scope="col" className="py-3 px-1 md:px-2 text-center">
                  Action
                </th>
                


              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return <tr key={item.email} className="bg-white border-border-collapse   dark:bg-gray-800 dark:border-gray-700">

                  <td className="py-4 px-2 md:px-2 text-center">
                    {item.name}
                  </td>
                  <td className="py-4 px-1 md:px-2 text-center">
                    {item.email}
                  </td>
                  <td className="py-4 px-1 md:px-2 text-center">
                    {item.phone}
                  </td>
                  <td className="py-4 px-1 md:px-2 text-center">
                    {item.role}
                  </td>
                  <td className="py-4 px-1 md:px-2 text-center">
                    {item.address}
                  </td>
                  

                  <td className="py-4 px-2 md:px-2 text-center">
                    <div className="flex space-x-2 items-center justify-center">
                    
                    <button onClick={(e) => { 
                           setTeacherDetails((prev)=>{
                            return {...prev, 
                              _id:item._id,
                              name: item.name,
                              email: item.email,
                              role: item.role,
                              address:item.address,
                              phone: item.phone,
                             }
                           })

                      setShowModal(true)

                       }} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded py-0.5 px-1  md:px-2 md:py-1" >Edit</button>

<button onClick={(e) => { 
                      let confirmVal=confirm("Do you really want to delete?")
                      if(confirmVal){
                        handleDeleteTeacher(item)
                      }
                       }} className="bg-red-500 hover:bg-red-600 text-white rounded py-0.5 px-1  md:px-2 md:py-1" >Delete</button>
                       </div>
                  </td>
                  
                </tr>
              })}

            </tbody>
          </table>
        </div> : <div className="flex justify-center items-center shadow-sm my-20 p-10 text-red-500">No Teacher records found! Please add Teachers. </div>}


    



      </main>



    </div>
    
    {showModal && (


<div className="lg:ml-60 bg-gray-100 h-fit absolute inset-0 flex items-center justify-center z-[120] ">

  <div className="bg-violet-900 mt-12  rounded-lg mb-10">
    {/* heading */}
  <div className="text-center font-bold text-xl mt-4 border-b border-solid border-slate-200">
    <h2 className="mb-2 text-gray-100">Edit the teacher details</h2>
    </div>
    {/* body */}
    <div>

    <div className='p-6  pt-6 flex justify-center w-full'>
    
    <div className="block p-6 rounded-lg shadow-lg bg-white lg:w-[50rem] w-80 md:w-[40rem]  mb-12">
        
      <div className="form-group mb-6">
        <label htmlFor="name"  className="formLabel inline-block mb-2 text-gray-700">Name</label>
        <input onChange={handleChange} value={teacherDetails.name} name="name" type="text" className="form-control
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
        <input onChange={handleChange} value={teacherDetails.email} name="email" type="email" className="form-control
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
          placeholder="Enter the mail id"/>
      </div>
      
      
     
      <div className="form-group mb-6">
        <label htmlFor="role"  className="formLabel inline-block mb-2 text-gray-700">Role (set admin or teacher)</label>
        <input onChange={handleChange} value={teacherDetails.role} name="role" type="text" className="form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="role"
          placeholder="Enter a Role"/>
      </div>
      
     
      <div className="form-group mb-6">
        <label htmlFor="address"  className="formLabel inline-block mb-2 text-gray-700">Address</label>
        <input onChange={handleChange} value={teacherDetails.address} name="address" type="text" className="form-control
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
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="address"
          placeholder="Enter the address"/>
      </div>
      
      <div className="form-group mb-6">
        <label htmlFor="phone"  className="formLabel inline-block mb-2 text-gray-700">Phone number</label>
        <input onChange={handleChange} value={teacherDetails.phone} name="phone" type="number" className="form-control
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
      
     

      
     
      
      
  



  </div></div>


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

  let users = await User.find({})

  return { props: { allTeachers: JSON.parse(JSON.stringify(users)) } }
}

