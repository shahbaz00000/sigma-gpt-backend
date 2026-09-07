require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// internal modules
const authRoute = require('./routes/authRoute');
const  generateContentRoute = require('./routes/generateReportRoute');

// middleware
app.use(express.json());
app.use(cors());

// Routes middlaware
app.use("/api",authRoute);
app.use("/api",generateContentRoute);

// server is started on port no 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});