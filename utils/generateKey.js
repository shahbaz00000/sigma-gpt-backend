const generateOtpKey = (email)=>{
    const otpKey = `otp:${email}`
    return otpKey;
}

module.exports = generateOtpKey;