require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const Email = process.env.EMAIL;
// const EmailPass = process.env.EMAIL_PASS;
// const nodemailer = require('nodemailer');
module.exports = sendEmail = async (req, link, res) => {
  // console.log(link)
  try {
    const { name, to, message, link } = req.body;
    if (name == '' || undefined || to == '' || undefined) {
      return res.json({
        message: 'Input fields are required',
        success: false
      });
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    let msg = {
      from: Email,
      to: to,
      subject: 'File Share',
      text: message,
      html: `
      <div>
        <p>
            Hello there! Welcome to the XShare file sharing service.<br> ${name} sent you a file.
            <br>
            You can access the file using the link below:<br> ${link}
        </p>
        <p>${message}</p>
      </div>`
    };

    sgMail.send(msg, (error, body) => {
      if (error) {
        console.log('failed', error);
        return 'failed';
      } else {
        console.log('success');
        return 'succesful';
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error, success: false });
  }
};
