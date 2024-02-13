import nodemailer from 'nodemailer';

export const sendEmail = async ({email,emailType,otp}) => {
    try { 
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.nodemailer_user_email, 
          pass: process.env.nodemailer_app_password,
        },
      });
  
      const mailOptions = {
        from: process.env.nodemailer_user_email,
        to: email,
        subject: 'Email Verification',
        text: `Your verification code is ${otp}`,
      };
      await transporter.sendMail(mailOptions);
    
    } catch (error) {
        throw new Error(error.message)
    }
}