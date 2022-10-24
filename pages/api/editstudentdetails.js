import connectDb from '../../middleware/mongoose';
import Student from '../../models/students';
export default async function handler(req, res) {
    console.log(req.body)
    connectDb()
    if (req.method === "POST") {
        
            await Student.findByIdAndUpdate(req.body._id, req.body)
            res.status(200).send({ success: true })
    }
    else {
        res.status(400).send({success:false, error: "Not allowed" })
    }

}
