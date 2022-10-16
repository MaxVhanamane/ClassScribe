const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    className: { type: String, required: true },
    division: { type: String, required: true },
    rollNumber: { type: Number, required: true },
}, { timestamps: true });
const Student=mongoose.models.Student || mongoose.model("Student", StudentSchema)
export default Student
