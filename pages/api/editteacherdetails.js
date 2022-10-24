import connectDb from '../../middleware/mongoose';
import User from '../../models/users';
export default async function handler(req, res) {
    connectDb()
    if (req.method === "POST") {
        console.log("ye wal max",req.body)
        
             await User.findByIdAndUpdate(req.body._id, req.body)
            res.status(200).send({ success: true })
    }
    else {
        res.status(400).send({success:false, error: "Not allowed" })
    }

}
