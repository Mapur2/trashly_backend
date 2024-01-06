const nodemailer = require('nodemailer');

const sendEmail = async (userEmail, text) => {

    try{
    const testAccount =await nodemailer.createTestAccount()

    const config = {
        service: 'gmail',
        auth:{
            user: process.env.EMAIL,
            pass:process.env.EMAIL_PASS
        }
    }

    let transporter = nodemailer.createTransport(config)


    let message = {
        from: process.env.EMAIL, // sender address
        to:userEmail, // list of receivers
        subject: "Trashly", // Subject line
        text: `Hello, ${userEmail}`, // plain text body
        html: text, // html body
    }

    const url =  await transporter.sendMail(message)
    return url
    }
    catch(error)
    {
        console.log(error)
    }
    
}

module.exports = sendEmail