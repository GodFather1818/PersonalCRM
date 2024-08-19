// Updated passwordSchema.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const passwordSchema = new mongoose.Schema({
    website: {
        type: String,
        required: [true, "Please Enter the Website's Name!"],
    },
    password: {
        type: String,
        required: [true, "Please enter the Password!"],
    },
    securityQuestions: [
        {
            question: String,
            answer: String,
        },
    ],
    date: {
        type: Date,
        default: Date.now,
    },
});


passwordSchema.methods.isCorrectAnswer = async function (question, answer) {
    const securityQuestion = this.securityQuestions.find((q) => q.question === question);
    if (!securityQuestion) {
        return false;
    }
    return await bcrypt.compare(answer, securityQuestion.answer);
};

const Password = mongoose.model("Password", passwordSchema);
module.exports = Password;
