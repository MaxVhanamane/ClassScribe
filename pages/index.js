import { useEffect,useState } from 'react';
import Head from "next/head"
import connectDb from './../middleware/mongoose';
import Student from '../models/students';
import Select from './../components/Select';

export default function Home({allStudents}) {

  useEffect(() => {
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSearch(event) {
    setSearchTerm(event.target.value)
    setshowSearch(true)
  }
  return (
    <>
    <Head>
   <title>Attendance</title>
   <meta name="description" content="Maharashtra state board notes for classes 5 to 10. Notes are available in marathi and english language. "></meta>

    </Head>
<div className='lg:mb-28 mb-36'>
<div className=' flex flex-col items-center justify-center'>
<h1 className=' mb-4 bg-violet-900 w-full text-white text-lg text-center py-1'><span className='animate-pulse'>Attendance with notification</span> </h1>


</div>
 <div>

<h1 className='text-center text-purple-900 font-bold md:text-2xl text-xl mx-1 mt-10'> Select Class and division</h1>
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
  return { props: { allStudents:JSON.parse(JSON.stringify(classes)) } }
}
