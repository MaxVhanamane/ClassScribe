import connectDb from "../../middleware/mongoose";
import Student from "../../models/students";
import AttendanceRecord from '../../models/attendancerecord';

export default async function handler(req,res){
    connectDb()
    if(req.method==="POST"){
        
        let deleteStudent = await Student.findOneAndDelete(req.body)
        let deleteStudentAttendance=await AttendanceRecord.deleteMany({name:req.body.name,DOB:req.body.DOB})
        if(deleteStudent){

            res.status(200).json({ success: true })
        }
        else{
            res.status(200).json({ success: false })
        }
    }
    else{
        res.status(405).json({success:false,"error":"Not Allowed"})
    }
}
