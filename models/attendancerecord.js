const mongoose = require('mongoose');

const AttendanceRecordSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student',required: true},
    email: { type: String, required: true },
    phone:{type:Number,required:true},
    className: { type: String, required: true },
    division: { type: String, required: true },
    rollNumber: { type: Number, required: true },
    attendance: { type: String, required: true },
    date:{type:Date,required:true},
    time:{type:String,required:true},
    genRegNumber:{type:Number,required:true},
    DOB:{type:Date,required:true},
    caste:{type:String,required:true},
    subCaste:{type:String,required:true}
}, { timestamps: true });
const AttendanceRecord=mongoose.models.AttendanceRecord || mongoose.model("AttendanceRecord", AttendanceRecordSchema)
export default AttendanceRecord
