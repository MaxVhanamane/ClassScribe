import connectDb from '../../middleware/mongoose';
import jwt from "jsonwebtoken"


export default async function handler(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
   
    connectDb()

    if (req.method === "POST") {
        let user= jwt.verify(token, process.env.JWT_SECRET,function(err,decode){
            if(err){
              res.status(200).json({ success:false,error: err })
            }
            else{
                res.status(200).json({ success:true})
            }
          });
    
    }


    else {
        res.status(400).send({ error: "Not allowed" })
    }
}
