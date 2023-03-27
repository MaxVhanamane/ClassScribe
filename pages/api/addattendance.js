import connectDb from '../../middleware/mongoose';
import AttendanceRecord from '../../models/attendancerecord';
import Student from './../../models/students';
const mongoose = require('mongoose');
export default async function handler(req, res) {
    connectDb()

    if (req.method === "POST") {
        let startDate = new Date(req.body.date.split("T")[0] + "T00:00:00Z")
        let endDate = new Date(req.body.date.split("T")[0] + "T23:59:59Z")
        // Check If todays attendance is taken or not. If it is the first one then we will add all other students attendance of that class
        // as NT (not taken). so that when we try to see a table using showattendace page at that time everything would look consistent.(if you  take an attendance of only one student and try to see a table then it doesn't look good to avoid that I am adding NT.)
        let todaysAttendanceStarted = await AttendanceRecord.find({ className: req.body.className, "date": { "$gte": startDate, "$lt": endDate } }) 

        let allStudents = await Student.find({ className: req.body.className })
        // await AttendanceRecord.deleteMany({
        //     date: {
        //       $gte: startDate,
        //       $lt: endDate
        //     }
        //   })
        //   return res.send("hi")

        if(todaysAttendanceStarted.length!=0 && (allStudents.length!=todaysAttendanceStarted.length)){
            // const set2 = new Set(todaysAttendanceStarted.map(obj => obj.name));
            // // filter array1 to keep only objects whose name is not in the set
            // const filteredArray = allStudents.filter(obj => !set2.has(obj.name));

let attendance = new AttendanceRecord({
            name: mongoose.Types.ObjectId(req.body._id),
            email: req.body.email,
            phone: req.body.phone,
            className: req.body.className,
            division: req.body.division,
            rollNumber: req.body.rollNumber,
            attendance: req.body.attendance,
            date: new Date(req.body.date),
            time: req.body.time,
            genRegNumber: req.body.genRegNumber,
            caste: req.body.caste,
            subCaste: req.body.subCaste,
            DOB: req.body.DOB
        })
        await attendance.save()
        return res.status(200).send({ success: "true" })

        }


        if (todaysAttendanceStarted.length <= 0) {
            let newArray = allStudents.map((data) => {
                let obj = data.toObject();
                obj.name=obj._id
                delete obj._id;
                delete obj.createdAt;
                delete obj.updatedAt;
                delete obj.__v;
                // Add a 'gender' key
                obj.attendance = 'NT';
                obj.date = req.body.date;
                obj.time = req.body.time;
                return obj
            })
            // Insert the documents
            try {
                await AttendanceRecord.insertMany(newArray);
            } catch (error) {
                console.log(error)
               return res.status(200).send({ success: "false" })
            }


        }
        // If todaysAttendanceStarted.length>0 it means we already added attendance=NT for other students. now we will just update that.
        // Here I am not putting second operation in else statement because when first attendance starts, I will make all the students attendace of that particular class as NT then I will update the first students attendance. from second students attendance it doesn't go in if statement from there it will just update the old attendance that is set as NT.
        try{

            await AttendanceRecord.findOneAndUpdate({ name: mongoose.Types.ObjectId(req.body._id), "date": { "$gte": startDate, "$lt": endDate } }, { attendance: req.body.attendance, date: req.body.date ,time:req.body.time})
            return res.status(200).send({ success: true })
        }
        catch(err){
            console.log(err)
            return res.status(200).send({ success: false })

        }



    }
    else {
        res.status(400).send({ error: "Not allowed" })
    }

}


// To be able to select a range of dates, you will need to store the date field as a Date object.
// you can't store dates in string format like this eg. 4-4-1998
