import Head from "next/head"
import connectDb from './../middleware/mongoose';
import Student from '../models/students';
import Select from './../components/Select';
import { useContext } from "react";
import { AuthContext } from "../context/AuthState";

export default function Home({ allStudents }) {

    const {token} =useContext(AuthContext)
    console.log(token)
  if(!token){
    return null
  }

  return (
    <>
      <Head>
        <title>Attendance</title>
        <meta name="description" content="Maharashtra state board notes for classes 5 to 10. Notes are available in marathi and english language. "></meta>

      </Head>
      <div className='lg:mb-28 mb-36'>
        <div className=' flex flex-col items-center justify-center mt-[3.25rem]'>
          <h1 className='bg-teal-500 w-full text-white text-lg text-center py-1'><span className='animate-pulse hidden md:block'>Effortlessly Take and Track Attendance with Real-Time Notifications</span><span className='animate-pulse md:hidden'>Attendance with notification</span> </h1>
        </div>

        <div>
          <h1 className='text-center text-gray-700 font-bold md:text-2xl text-xl mx-1 mt-6'> Select Class and division</h1>
        </div>
        <Select allStudents={allStudents} />
      </div>
    </>

  )
}

// This gets called on every request
export async function getServerSideProps(context) {
  // Fetch data from external API
  connectDb()
  let classes = await Student.find({});
  return { props: { allStudents: JSON.parse(JSON.stringify(classes)) } }
}
