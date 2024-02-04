import { sendEmail } from '../mailer.js';
import User from '../models/auth.js'


export const generateOtp = async (req, res) => {
    try{
        const email = req.body.email;
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(401).json('User not found');
        }
        // Generate OTP and save it to the database
        let otp = Math.floor(Math.random() * 999999+ 111111);
        const expirationTime = Date.now() + 120 * 1000;
        user.otpCode = parseInt(otp)
        user.otpExpiration = expirationTime
        await user.save();
        const id = user._id;
        // Send Email with OTP
       await sendEmail({email,emailType:"VERIFY",otp});
       return res.status(200).json({message:"Otp Sent",id});
    }catch(err){
        console.log(err);
    }
}

export const verifyOtp  = async (req,res)=>{
    try{
        const otp = req.body.otp;
        const id = req.body.userId;
        const user = await User.findById(id);
        if(!user){
            return res.status(401).json("Invalid User");
        }
        else if(Date.now() > user.otpExpiration){
            return res.status(403).json("OTP Expired")
            }else if(otp != user.otpCode){
                console.log("Hello");
                return res.status(403).json("Incorrect OTP")
                }else{
                // Reset OTP fields in DB
                user.otpCode=null;
                user.otpExpiration=null;
                user.isAuthenticated= true;
                await user.save();
               return res.status(200).json("User Authenticated");
            }
    }catch(err){
        console.log(err)
    }
}
