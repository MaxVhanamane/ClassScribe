import connectDb from '../../middleware/mongoose';
import Student from '../../models/students';

export default async function handler(req, res) {

    connectDb()

   if(req.method==="POST")

   {
    let students = await Student.find({className:req.body.className,division:req.body.division})

    res.status(200).json({ students })
   }
   else if (req.method==="GET"){
 
        let students = await Student.find({})

        res.status(200).json({ students })
   }
   else{
    res.status(405).json({"error":"NOT Allowed"})
   }
       
    
   
  
}
