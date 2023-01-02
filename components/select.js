import React,{useState} from 'react'
import Link from "next/link"

export default function Select({allStudents}) {
  let classNm= allStudents.map((cl)=>{return cl.className})
  let uniqueclassNm = [...new Set(classNm)].sort(function (a, b) {  return a - b;  });


  let division= allStudents.map((div)=>{return div.division})
  let uniqueDivisionName= [...new Set(division)]

 
  const [selectClass, setSelectClass] = useState();
  const [divisionName, setDivisionName] = useState();
   

  return (
    <div className='flex flex-col items-center justify-center'>
  
  <div  className='mt-6'> 
<label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900  text-center">Select the Class</label>
<div className='mt-2'>
<select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
  value={selectClass}
  defaultValue={"default"}
  onChange={(e) => setSelectClass(e.target.value) }
>
  <option value={"default"} className="text-center" disabled>
    Select the class

  </option>
  {uniqueclassNm.map((cls)=>{return <option key={cls} className="text-center" value={cls}>{cls}</option> })}

</select>
</div>

</div>

  <div  className='mt-8'> 
<label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900  text-center">Select the Division</label>
<div className='mt-2'>
<select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
  value={divisionName}
  defaultValue={"default"}
  onChange={(e) => {setDivisionName(e.target.value) }}
>
  <option value={"default"} className="text-center" disabled>
    Select the division

  </option>
  {uniqueDivisionName.map((division)=>{return <option key={division} className="text-center" value={division}>{division}</option> })}

</select>
</div>

</div>


  

<Link href={`/takeattendance?className=${selectClass}&division=${divisionName}`}><button disabled={divisionName==undefined || selectClass==undefined } className='outline-none bg-purple-900 w-32 text-gray-100 hover:bg-purple-800 disabled:bg-gray-500  p-1 text-sm rounded-md mt-8'>Take Attendance</button></Link>
<Link href={`/showattendance?className=${selectClass}&division=${divisionName}`}><button disabled={divisionName==undefined || selectClass==undefined } className='outline-none bg-purple-900 w-32 text-gray-100 hover:bg-purple-800 disabled:bg-gray-500  p-1 text-sm rounded-md mt-8'>Show Attendance</button></Link>
<p className="mt-2 text-gray-500 text-sm px-4 text-center">* Select all the above options to enable the buttons.</p>

      
    </div>
  )
}




