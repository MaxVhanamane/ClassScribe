import connectDb from '../../middleware/mongoose';
import AttendanceRecord from '../../models/attendancerecord';

export default async function handler(req, res) {
    connectDb()
   if(req.method==="POST")
   {
    let students = await AttendanceRecord.find({"date": {"$gte": req.body.sDate, "$lt": req.body.eDate}})
    res.status(200).json({ students })
   }
   
   else{
    res.status(405).json({"error":"NOT Allowed"})
   }
       
    
   
  
}
