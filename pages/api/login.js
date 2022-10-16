import connectDb from '../../middleware/mongoose';
import User from '../../models/users';
// crypto-js is used for data encryption and decryption. This is used for security purpose like user authentication where storing the password in Database in the encrypted form.
import { AES, enc } from 'crypto-js';
import jwt from "jsonwebtoken"
export default async function handler(req, res) {
    connectDb()
    if (req.method === "POST") {

        try {
            let user = await User.findOne({ "email": req.body.email })
            if (user) {
                // Decrypting password to verify user
               
                let bytes = AES.decrypt(user.password, process.env.JWT_SECRET);
                let decryptedPass = bytes.toString(enc.Utf8);
                if (user.email === req.body.email && decryptedPass === req.body.password) {
                    const jwtToken = jwt.sign({
                        name:user.name, email:user.email
                    }, process.env.JWT_SECRET, { expiresIn: '2d' });
                    res.status(200).json({ success: true, jwtToken,email:user.email,role:user.role })
                }
                else {

                    res.status(200).send({ success: false, error: "Invalid Password" })
                }
            }
            else {
                res.status(200).send({ success: false, error: "Invalid Credentials" })
            }
        }
        catch (err) {
            res.status(500).send({ error: err.message })
        }

    }


    else {
        res.status(400).send({ error: "Not allowed" })
    }
}
