const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// send-otp route
router.post("/auth/send-otp", authController.sendOtp);

// verify-otp route
router.post("/auth/verify-otp", authController.verifyOtp);

module.exports = router;