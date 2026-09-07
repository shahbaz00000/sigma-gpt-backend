const mongoose = require('mongoose');

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    intension:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }    
});
const behavirolQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    intension:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    }
});

skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:true
    },
    saverity:{
        type:String,
        enum:["low","medium","high"],
        required:true
    }
});

preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    task:[
        {
            type:string,
            required:true
        }
    ]
})

const interviewReportSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    resume:{
        type:String,
        required:true
    },
    selfDescription:{
        type:String,
        required:true
    },
    jobDescription:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavirolQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema]
})
const Report = mongoose.model('Report', interviewReportSchema);

module.exports = Report;