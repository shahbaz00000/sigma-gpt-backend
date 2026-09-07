const generateOtp = require('../utils/generateOtp');
const generateOtpKey = require('../utils/generateKey');
const transporter = require('../services/nodemailerService');
const redisClient = require('../services/redisService');

exports.sendOtp = async (req,res,next)=>{
    console.log("sendOtp called");
    const {email} = req.body;
    try{
        const otp = generateOtp();
        const otpKey = generateOtpKey(email);

        // Store the OTP in Redis with a 5-minute expiration
        await redisClient.set(otpKey, otp, 'EX', 300); // 300 seconds = 5 minutes

        // send opt by a mail
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`
        };
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'OTP sent successfully',email,otp });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ errorMessage: error.message});
    }
};

exports.verifyOtp = async (req,res,next)=>{
    console.log("verifyOtp called");
    const {email,otp} = req.body;
    console.log("email:", email, "otp:", otp);
    try{
        const otpKey = generateOtpKey(email);
        const storedOtp = await redisClient.get(otpKey);
        if(!storedOtp){
            return res.status(400).json({errorMessage:"OTP has expired or is invalid"});
        }
        if(storedOtp !== otp){
            return res.status(400).json({errorMessage:"Invalid OTP"});
        }
        // Optionally, delete the OTP from Redis after successful verification
        // await redisClient.del(otpKey);
        res.status(200).json({message:"OTP verified successfully"});

    }catch(error){
        console.log(error.message);
        res.status(500).json({errorMessage:error.message});
    }
};    