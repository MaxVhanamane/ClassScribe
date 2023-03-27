import connectDb from '../../middleware/mongoose';
import AttendanceRecord from '../../models/attendancerecord';

export default async function handler(req, res) {
    connectDb()
   if(req.method==="POST")
   {
    let studentsAttendanceRecord = await AttendanceRecord.find({className:req.body.className, division:req.body.division,"date": {"$gte": req.body.sDate, "$lt": req.body.eDate}})
    res.status(200).json({ studentsAttendanceRecord })
   }
   
   else{
    res.status(405).json({"error":"NOT Allowed"})
   }
       
    
   
  
}
