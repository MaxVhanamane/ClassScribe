import connectDb from '../../middleware/mongoose';
import AttendanceRecord from '../../models/attendancerecord';

export default async function handler(req, res) {
    connectDb()
    console.log(req.body.sDate)
    console.log(req.body.eDate)
   if(req.method==="POST")
   {
    let students = await AttendanceRecord.find({className:req.body.className, division:req.body.division,"date": {"$gte": req.body.sDate, "$lt": req.body.eDate}})
    res.status(200).json({ students })
   }
   
   else{
    res.status(405).json({"error":"NOT Allowed"})
   }
       
    
   
  
}
