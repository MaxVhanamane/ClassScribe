import connectDb from '../../middleware/mongoose';
import Student from '../../models/students';
export default async function handler(req, res) {
    connectDb()

    if (req.method === "POST") {
       
            let studentDetails = new Student({
                name: req.body.name,
                email: req.body.email, 
                className: req.body.className,
                division: req.body.division,
                rollNumber: req.body.rollNumber,
        
            })
            await studentDetails.save()
        
        res.status(200).send({ success: true })
       
    }
    else {
        res.status(400).send({ error: "Not allowed" })
    }

}

