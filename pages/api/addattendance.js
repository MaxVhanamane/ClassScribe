import connectDb from '../../middleware/mongoose';
import AttendanceRecord from '../../models/attendancerecord';
export default async function handler(req, res) {
    connectDb()

    if (req.method === "POST") {
        let startDate=req.body.date.split("T")[0]+ "T00:00:00Z"
        let endDate=req.body.date.split("T")[0]+ "T23:59:59Z"
        let checkAttendanceAlreadyTaken=await AttendanceRecord.find({name: req.body.name,"date": {"$gte":startDate, "$lt": endDate}})
        if(checkAttendanceAlreadyTaken.length<=0){
            let attendance = new AttendanceRecord({
                name: req.body.name,
                email: req.body.email, 
                phone:req.body.phone,
                className: req.body.className,
                division: req.body.division,
                rollNumber: req.body.rollNumber,
                attendance: req.body.attendance,
                date: req.body.date,
                time: req.body.time,
                genRegNumber:req.body.genRegNumber,
                caste:req.body.caste,
                subCaste:req.body.subCaste,
                DOB:req.body.DOB
            })
            await attendance.save()
        
        res.status(200).send({ success: "success" })
        }
        else{

            let att=await AttendanceRecord.findOneAndUpdate({"date": {"$gte":startDate, "$lt": endDate}},{attendance: req.body.attendance})
        }
       
    }
    else {
        res.status(400).send({ error: "Not allowed" })
    }

}


// To be able to select a range of dates, you will need to store the date field as a Date object. 
// you can't store dates in string format like this eg. 4-4-1998
