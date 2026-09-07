const generateContent = require('../services/huggingFace-service');
const { PDFParse } = require("pdf-parse");
const fs = require("fs")

exports.generateReport = async (req, res, next) => {
    console.log("called the generate Report")
    try {
        const { selfDescription, jobDescription } = req.body;

        // Check whether file was uploaded
        if (!req.file) {
            return res.status(400).json({
                errorMessage: "Resume file is required"
            });
        }
        // Get uploaded file path
        const resume = req.file.path;

        // Read uploaded PDF
        const pdfBuffer = fs.readFileSync(resume);

        /// IMPORTANT: PDFParse is a class
        const parser = new PDFParse({
            data: pdfBuffer
        });
        // Extract text
        const pdfData = await parser.getText();

        const resumeText = pdfData.text;
        // Generate report
        const result = await generateContent(
            selfDescription,
            jobDescription,
            resumeText
        );
        console.log(result)
       res.status(200).json({
            message: "Content generated successfully",
            report: result
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            errorMessage: error.message
        });
    }
};