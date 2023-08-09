import connectDb from '../../middleware/mongoose';
import Student from '../../models/students';
export default async function handler(req, res) {

    connectDb()
    
    if (req.method === "POST") {
        // {new: true} return updated object 
        let data = await Student.findByIdAndUpdate(req.body._id, req.body, { new: true })
        res.status(200).send({ success: true, data })
    }
    else {
        res.status(400).send({ success: false, error: "Not allowed" })
    }

}
