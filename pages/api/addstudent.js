import connectDb from '../../middleware/mongoose';
import Student from '../../models/students';

export default async function handler(req, res) {

    connectDb()

    if (req.method === "POST") {

       try{
        let studentDetails = new Student({
            name: req.body.name,
            email: req.body.email, 
            phone:req.body.phone,
            className: req.body.className,
            division: req.body.division,
            rollNumber: req.body.rollNumber,
            genRegNumber:req.body.genRegNumber,
            DOB:req.body.DOB,
            caste:req.body.caste,
            subCaste:req.body.subCaste
        })
        await studentDetails.save()
    
    res.status(200).send({ success: true })

       }
       catch(error){
        
    res.status(200).send({ success: false })
        
       }
         
       
    }
    else {
        res.status(400).send({ error: "Not allowed" })
    }

}

