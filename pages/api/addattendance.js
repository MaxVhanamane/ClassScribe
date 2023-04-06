import connectDb from '../../middleware/mongoose';
import AttendanceRecord from '../../models/attendancerecord';
import Student from './../../models/students';
const mongoose = require('mongoose');
let isProcessing = false
export default async function handler(req, res) {
    connectDb()

    if (req.method === "POST") {
        // adding a lock let isProcessing=false because If user clicks twice quickly on present or absent buttons. it creates dummy data because it starts to process both request at the same time. to avoid that I have added isProcessing variable. once first request completes then we will make it false till then if there is second request it will be in the while loop. we will release the lock before returning.
        // Wait until the lock is released before processing the request
        while (isProcessing) {
            //When you run the while loop without any delay or wait time, the loop will execute as quickly as possible, repeatedly checking whether the lock has been released. This can be very resource-intensive and can cause the server to become unresponsive or slow down.

            // By adding the await new Promise(resolve => setTimeout(resolve, 1000)) line, you're introducing a delay of 1 second between each iteration of the loop. This reduces the number of times the loop checks the lock, which in turn reduces the server's resource usage and improves performance.
            await new Promise(resolve => setTimeout(resolve, 700));
        }
        // Set the lock
        isProcessing = true;

        let startDate = new Date(req.body.date.split("T")[0] + "T00:00:00Z")
        let endDate = new Date(req.body.date.split("T")[0] + "T23:59:59Z")
        // Check If today's attendance is taken or not. If it is the first one then we will add all other students attendance of that class
        // as NT (not taken). so that when we try to see a table using showattendace page at that time everything would look consistent.(if you  take an attendance of only one student and try to see a table then it doesn't look good to avoid that I am adding NT.)
        let todaysAttendanceStarted = await AttendanceRecord.find({ className: req.body.className, "date": { "$gte": startDate, "$lt": endDate } })

        let allStudents = await Student.find({ className: req.body.className })
        // await AttendanceRecord.deleteMany({
        //     date: {
        //       $gte: startDate,
        //       $lt: endDate
        //     }
        //   })
        //    isProcessing = false;
        //   return res.send("hi")
       
        // If you have taken attendance of 5 students and then you add new student that creates a problem to avoid that issue I'm checking allStudents.length==todaysAttendanceStarted.length. if (allStudents.length != todaysAttendanceStarted.length) then we will add those students in attendance. there is if statement below to handle this.
        if ((todaysAttendanceStarted.length != 0) && (allStudents.length == todaysAttendanceStarted.length)) {
            await AttendanceRecord.findOneAndUpdate({ name: mongoose.Types.ObjectId(req.body._id), "date": { "$gte": startDate, "$lt": endDate } },
                {
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
            isProcessing = false
            return res.status(200).send({ success: true })

        }


        if (todaysAttendanceStarted.length <= 0) {
            let newArray = allStudents.map((data) => {
                let obj = data.toObject();
                obj.name = obj._id
                delete obj._id;
                delete obj.createdAt;
                delete obj.updatedAt;
                delete obj.__v;
                obj.attendance = 'NT';
                obj.date = req.body.date;
                obj.time = req.body.time;
                return obj
            })
            // Insert the documents
            try {
                await AttendanceRecord.insertMany(newArray);
                // If todaysAttendanceStarted.length>0 it means we already added attendance=NT for other students. now we will just update that.
                // Here I am not putting second operation in else statement because when first attendance starts, I will make all the students attendace of that particular class as NT then I will update the first students attendance. from second students attendance it doesn't go in if statement from there it will just update the old attendance that is set as NT.
                await AttendanceRecord.findOneAndUpdate({ name: mongoose.Types.ObjectId(req.body._id), "date": { "$gte": startDate, "$lt": endDate } }, { attendance: req.body.attendance, date: req.body.date, time: req.body.time })
                isProcessing = false
                return res.status(200).send({ success: true })
            } catch (error) {
                console.log(error)
                isProcessing = false
                return res.status(200).send({ success: false })
            }


        }

        // checking this allStudents.length!=todaysAttendanceStarted.length to make sure there is no new student added in the middle of attendance.
        // If new students are added while taking attendance then we will handle that here.
        if ((todaysAttendanceStarted.length != 0) && (allStudents.length != todaysAttendanceStarted.length)) {
            // get all the newly added students
            const newlyAddedStudents = allStudents.filter((obj2) => {
                return !todaysAttendanceStarted.some((obj1) => {
                    return obj2._id.equals(obj1.name)
                });
            });
            // add "NT" as their attendance
            let newStudents = newlyAddedStudents.map((data) => {
                let obj = data.toObject();
                obj.name = obj._id
                delete obj._id;
                delete obj.createdAt;
                delete obj.updatedAt;
                delete obj.__v;
                obj.attendance = 'NT';
                obj.date = req.body.date;
                obj.time = req.body.time;
                return obj
            })
            // Insert the documents
            try {
                // add all the newly added students with their attendance="NT"
                await AttendanceRecord.insertMany(newStudents);
                // update the one whose present or absent button is clicked
                await AttendanceRecord.findOneAndUpdate({ name: mongoose.Types.ObjectId(req.body._id), "date": { "$gte": startDate, "$lt": endDate } }, { attendance: req.body.attendance, date: req.body.date, time: req.body.time })
                isProcessing = false
                return res.status(200).send({ success: true })
            } catch (error) {
                console.log(error)
                isProcessing = false
                return res.status(200).send({ success: false })
            }

        }



    }
    else {
        res.status(400).send({ error: "Not allowed" })
    }

}


// To be able to select a range of dates, you will need to store the date field as a Date object.
// you can't store dates in string format like this eg. 4-4-1998
