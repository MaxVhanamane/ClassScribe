import connectDb from '../../middleware/mongoose';
import AttendanceRecord from '../../models/attendancerecord';

export default async function handler(req, res) {
    connectDb()
    if (req.method === "POST") {
        
            await AttendanceRecord.findByIdAndUpdate(req.body._id, {attendance:req.body.attendance})
            res.status(200).send({ success: true })
    }
    else {
        res.status(400).send({success:false, error: "Not allowed" })
    }
}
