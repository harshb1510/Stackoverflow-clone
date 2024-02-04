import nodemailer from 'nodemailer';

export const sendEmail = async ({email,emailType,otp}) => {
    try { 
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: 'harshb15003@gmail.com', // generated ethereal email
          pass: 'dikp eiki jvkb wwgu', // generated ethereal password
          clientId: "183494134257-ahlu3uu80n16cakoiikpka4ejbr8nqai.apps.googleusercontent.com",
          clientSecret: "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",
          accessToken:"ya29.a0AfB_byAmzXR--GZyz3JnJHDlWk22b8Rl8n_P816_mXyvIm18KABF3u88K4kXrffu359-pSXmgb32np71Vpglm_zaA5E0sjJbjYFiIxxGJkuP8YtKX1-oBYQDY2i14zHkWt3eUQSBVRkvisxa8_nTrQgOjMIGeetV-KcgaCgYKAbgSARISFQHGX2MiO0Yaebr1yr2S0ImMYwxUiQ0171",
          refreshToken:"1//0475G1bZwWcnwCgYIARAAGAQSNwF-L9Irvgv9TJHjBgGl6c8kELURNJNmruuzMDXRSFhWTaM1IYY6f3Vy8ZVx1e6PDGYj7yakdBE"
        },
      });
  
      const mailOptions = {
        from: `harshb15003@gmail.com`,
        to: email,
        subject: 'Email Verification',
        text: `Your verification code is ${otp}`,
      };
      await transporter.sendMail(mailOptions);
    
    } catch (error) {
        throw new Error(error.message)
    }
}