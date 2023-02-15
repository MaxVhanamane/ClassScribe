import connectDb from "../../middleware/mongoose";
import Student from "../../models/students";
import AttendanceRecord from '../../models/attendancerecord';

export default async function handler(req,res){
    connectDb()
    if(req.method==="POST"){
        try{
            let deleteStudent = await Student.findOneAndDelete(req.body)
           let attendance= await AttendanceRecord.deleteMany({name:req.body._id,DOB:req.body.DOB})
           console.log(attendance)
            if(deleteStudent){
    
                res.status(200).json({ success: true,message:"Student details deleted successfully!" })
            }
            else{
                res.status(200).json({ success: false,message:"Some Error occured! please try again!" })
            }
        }
        catch(err){
            res.status(500).json({success:false,message:"Internal server error! please try again"})
        }
       
    }
    else{
        res.status(405).json({success:false,"error":"Not Allowed"})
    }
}
