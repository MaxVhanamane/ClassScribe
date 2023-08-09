const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    className: { type: String, required: true },
    division: { type: String, required: true },
    rollNumber: { type: Number, required: true },
    genRegNumber: { type: Number, required: true },
    DOB: { type: Date, required: true },
    caste: { type: String, required: true },
    subCaste: { type: String, required: true }
}, { timestamps: true });
const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema)
export default Student
