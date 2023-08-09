import connectDb from '../../middleware/mongoose';
import User from '../../models/users';

export default async function handler(req, res) {

    connectDb()

   if(req.method==="POST")
   {
    let teachers = await User.find({role:req.body.role})

    res.status(200).json({ teachers })
   }
   else if (req.method==="GET"){
 
        let teachers = await User.find({})

        res.status(200).json({ teachers })
    

   }
   else{
    res.status(405).json({"error":"NOT Allowed"})
   }
       
    
   
  
}
