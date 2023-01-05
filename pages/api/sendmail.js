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
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Attendance",
        // text: `Your son/daughter ${name} is ${attendanceValue}`,
        html:`<p style="font-weight:bold">Dear parent,</p>
        <p style="font-weight:bold"> Your son/daughter ${name} is <span style="color:${attendanceValue==="present"?"green":"red"}">${attendanceValue}</span> in school on ${new Date().toLocaleDateString("en-gb")}.</p>
        <p style="font-weight:bold">आपला पाल्य ${name} आज दिनांक ${new Date().toLocaleDateString("en-gb")} रोजी शाळेत <span style="color:${attendanceValue==="present"?"green":"red"}">${attendanceValue==="present"?"उपस्थित":"अनुपस्थित"}</span>  आहे.</p>
             <p style="font-weight:bold">Yours faithfully,</p>
             <p style="font-weight:bold">Someshwar Highschool Hattur.</p>`
             
      };
  
     let tr= nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
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
  