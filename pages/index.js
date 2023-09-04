import Head from "next/head"
import connectDb from './../middleware/mongoose';
import Student from '../models/students';
import Select from './../components/Select';
import { useContext } from "react";
import { AuthContext } from "../context/AuthState";
import Loading from "../components/Loading";

export default function Home({ allStudents }) {

  const { loading } = useContext(AuthContext)


  if (loading) {
    return <Loading />
  }



  return (
    <>
      <Head>
        <title>ClassScribe</title>
        <meta name="description" content="ClassScribe is a versatile and intuitive attendance management application designed to simplify the process of tracking student attendance and fostering effective communication with parents. With ClassScribe, teachers can seamlessly take attendance, mark students as 'present' or 'absent,' and instantly send notifications to parents regarding their child's attendance status. This user-friendly app streamlines classroom management by providing real-time insights into student attendance. "></meta>

      </Head>
      <div className='lg:mb-28 mb-36'>
        <div className=' flex flex-col items-center justify-center mt-[3.25rem]'>
          <h1 className='bg-teal-500 w-full text-white text-lg text-center py-1'><span className='animate-pulse hidden md:block'>Shri Someshwar High School Hattur</span><span className='animate-pulse md:hidden'>Shri Someshwar High School Hattur</span> </h1>
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
