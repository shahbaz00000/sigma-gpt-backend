const express = require('express');
const router = express.Router();
const generateReportController = require('../controller/generateReportcontroller');
const upload = require('../middleware/multerMiddleware');

// generate-report route
router.post("/ai/generate-interview-report", upload.single("resume"),generateReportController.generateReport);

module.exports = router;