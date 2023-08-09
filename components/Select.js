import React, { useState } from 'react'
import Link from "next/link"

export default function Select({ allStudents }) {

  let classNamesWithDuplicates = allStudents.map((studentInfo) => { return studentInfo.className })
  let uniqueClassNames = [...new Set(classNamesWithDuplicates)].sort(function (currentClassName, nextClassName) { return currentClassName - nextClassName; });
  let divisionsWithDuplicates = allStudents.map((studentInfo) => { return studentInfo.division })
  let uniqueDivisionNames = [...new Set(divisionsWithDuplicates)]

  const [selectClass, setSelectClass] = useState();
  const [divisionName, setDivisionName] = useState();


  return (
    <div className='flex flex-col items-center justify-center'>

      <div className='mt-6'>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900  text-center">Select the Class</label>
        <div className='mt-2'>
          <select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
            value={selectClass}
            defaultValue={"default"}
            onChange={(e) => setSelectClass(e.target.value)}
          >
            <option value={"default"} className="text-center" disabled>
              Select the class
            </option>
            {uniqueClassNames.map((cls) => { return <option key={cls} className="text-center" value={cls}>{cls}</option> })}
          </select>
        </div>
      </div>
      <div className='mt-8'>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900  text-center">Select the Division</label>
        <div className='mt-2'>
          <select className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 "
            value={divisionName}
            defaultValue={"default"}
            onChange={(e) => { setDivisionName(e.target.value) }}
          >
            <option value={"default"} className="text-center" disabled>
              Select the division
            </option>
            {uniqueDivisionNames.map((division) => { return <option key={division} className="text-center" value={division}>{division}</option> })}
          </select>
        </div>

      </div>
      <Link href={`/takeattendance?className=${selectClass}&division=${divisionName}`}><button disabled={divisionName == undefined || selectClass == undefined} className='outline-none bg-teal-600 w-32 text-gray-100 hover:bg-teal-700 disabled:bg-gray-500  p-1 text-sm rounded-md mt-8 ease-linear transition-all duration-150'>Take Attendance</button></Link>
      <Link href={`/showattendance?className=${selectClass}&division=${divisionName}`}><button disabled={divisionName == undefined || selectClass == undefined} className='outline-none bg-teal-600 w-32 text-gray-100 hover:bg-teal-700 disabled:bg-gray-500  p-1 text-sm rounded-md mt-8 ease-linear transition-all duration-150'>Show Attendance</button></Link>
      <p className="mt-2 text-gray-500 text-sm px-4 text-center">* Select all the above options to enable the buttons.</p>
    </div>
  )
}




