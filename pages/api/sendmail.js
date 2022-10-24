// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const nodemailer=require("nodemailer")

export default async function handler(req, res) {
    const {name,email,attendance}=req.body
    let attendanceValue
    if(attendance==="P"){
      attendanceValue="present"
    }
    else
    {attendanceValue="absent"}

    let message = {
        from: "oreo.max.1998@gmail.com",
        to: email,
        subject: "Attendance",
        text: `Your son/daughter ${name} is ${attendanceValue}`,
        // html: "<p>HTML version of the message</p>"
      };
  
     let tr= nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "oreo.max.1998@gmail.com",
          pass: "oqrktjkjqfrhmhme",
        },
      })
  
      try{
        let data= await tr.sendMail(message)
        return res.status(200).json({success:true})


      }
      catch(err){
        console.log(err)
        return res.status(500).json({success:false})
      }

    
  }
  