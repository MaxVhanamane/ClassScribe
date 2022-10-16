import connectDb from "../../middleware/mongoose";
import Student from "../../models/students";

export default async function handler(req,res){
    if(req.method==="POST"){
        let deleteStudent = await Student.findOneAndDelete(req.body)
        console.log("del",deleteStudent)
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
