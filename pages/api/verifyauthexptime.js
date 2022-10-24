import connectDb from '../../middleware/mongoose';
import jwt from "jsonwebtoken"


export default async function handler(req, res) {
    connectDb()
    const {token}=req.body
    // const fetchUserData=async(token)=>{
    //     const res=await fetch( `${process.env.NEXT_PUBLIC_HOST}/api/getuserdetails`, {
    //         method: 'POST', // or 'PUT'
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({tokenVal:token}),
    //       });
    //       const finalRes = await res.json();
    //       return finalRes;
    // }
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
