import connectDb from '../../middleware/mongoose';
import AttendanceRecord from '../../models/attendancerecord';
import Student from './../../models/students';
export default async function handler(req, res) {
    connectDb()

    if (req.method === "POST") {
        let startDate = new Date(req.body.date.split("T")[0] + "T00:00:00Z")
        let endDate =new Date(req.body.date.split("T")[0] + "T23:59:59Z")
        let todaysAttendanceStarted = await AttendanceRecord.find({ className: req.body.className, "date": { "$gte": startDate, "$lt": endDate } })
        if (todaysAttendanceStarted.length <= 0) {
            let allStudents = await Student.find({ className: req.body.className })
            let newArray = allStudents.map((data) => {
                let obj = data.toObject();
                delete obj._id;
                delete obj.createdAt;
                delete obj.updatedAt;
                delete obj.__v;
                // Add a 'gender' key
                obj.attendance = 'NT';
                obj.date = new Date(req.body.date);
                obj.time = req.body.time;
                return obj
            })
            // Insert the documents
            try {
                await AttendanceRecord.insertMany(newArray);
              } catch (error) {
                res.status(200).send({ success: "false" })
              }
              
        }
        // let checkAttendanceAlreadyTaken = await AttendanceRecord.find({ name: req.body.name, "date": { "$gte": startDate, "$lt": endDate } })
        // if (checkAttendanceAlreadyTaken.length <= 0) {
        //     let attendance = new AttendanceRecord({
        //         name: req.body.name,
        //         email: req.body.email,
        //         phone: req.body.phone,
        //         className: req.body.className,
        //         division: req.body.division,
        //         rollNumber: req.body.rollNumber,
        //         attendance: req.body.attendance,
        //         date: new Date(req.body.date),
        //         time: req.body.time,
        //         genRegNumber: req.body.genRegNumber,
        //         caste: req.body.caste,
        //         subCaste: req.body.subCaste,
        //         DOB: req.body.DOB
        //     })
        //     await attendance.save()

        //     res.status(200).send({ success: "success" })
        // }
      
            let updateAttendance = await AttendanceRecord.findOneAndUpdate({ name: req.body.name, "date": { "$gte": startDate, "$lt": endDate } }, { attendance: req.body.attendance })
            res.status(200).send({ success: "success" })

        

    }
    else {
        res.status(400).send({ error: "Not allowed" })
    }

}


// To be able to select a range of dates, you will need to store the date field as a Date object.
// you can't store dates in string format like this eg. 4-4-1998
