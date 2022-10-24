import connectDb from '../../middleware/mongoose';
import User from '../../models/users';
import { AES } from 'crypto-js';

export default async function handler(req, res) {
    connectDb()
    const {name,email,password,phone,role,address}=req.body
    if (req.method === "POST") {
       
        let isEmailUnique=await User.findOne({email:email})
        if(!isEmailUnique){
      // Encrypting password
        let encyPass = AES.encrypt(password, process.env.JWT_SECRET).toString();
        try{
            let user= new User({name,email,password:encyPass,role,address,phone})
            await user.save()
            res.status(200).send({ success: true })
        }
        catch(err){
            res.status(200).send({ success:false,error: err.message })
        }
    }

    else{
        res.status(200).send({ success:false,error:"Email already exists" })
    }
    
    }


    else {
        res.status(400).send({ error: "Not allowed" })
    }
}
