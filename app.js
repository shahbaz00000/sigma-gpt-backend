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


// test routes
app.get("/test",(req,es)=>{
    console.log("hit the test routes")
    res.json({message:"test routes is hited"})
})

// server is started on port no 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});