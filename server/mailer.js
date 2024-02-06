import nodemailer from 'nodemailer';

export const sendEmail = async ({email,emailType,otp}) => {
    try { 
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: process.env.nodemailer_user_email, // generated ethereal email
          pass: process.env.nodemailer_app_password, // generated ethereal password
          clientId: process.env.google_clientID,
          clientSecret: process.env.google_clientSecret,
          accessToken:process.env.google_access_token,
          refreshToken:process.env.google_refresh_token,
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