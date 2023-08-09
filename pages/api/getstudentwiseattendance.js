import connectDb from '../../middleware/mongoose';
import AttendanceRecord from '../../models/attendancerecord';

export default async function handler(req, res) {

    connectDb()

    if (req.method === "POST") {
        
        let studentsAttendance = await AttendanceRecord.find({ name: req.body._id, className: req.body.className, division: req.body.division, "date": { "$gte": req.body.sDate, "$lt": req.body.eDate } }).sort({ date: 1 })
        // .sort({ date: 1 }) to sort the data in ascending order.
        res.status(200).json({ studentsAttendance })
    }

    else {
        res.status(405).json({ "error": "NOT Allowed" })
    }




}
