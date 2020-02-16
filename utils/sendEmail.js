const nodemailer = require("nodemailer");

//https://nodemailer.com/about/
const sendEmail = async options => {
  // SMTP_HOST=smtp.mailtrap.io
  // SMTP_PORT=2525
  // SMTP_EMAIL=2feb7cf52bbad4
  // SMTP_PASSWORD=968fde9b449b08
  // FROM_EMAIL=desislava.petkova@skyfunds.bg
  // FROM_NAME=desislava
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // send mail with defined transport object
  const message = {
    from: `${process.env.FROM_NAME}<${process.env.FROM_EMAIL}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message // plain text body
  };

  const info=await transporter.sendMail(message)

  console.log("Message sent: %s", info.messageId);
  
};
module.exports=sendEmail