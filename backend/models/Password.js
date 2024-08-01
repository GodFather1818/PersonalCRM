const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const passwordSchema = new mongoose.Schema ({

    website: {
        type: String,
        required: [true, "Please Enter the Website's Name!"]
    }, 
    password: {
        type: String,
        required: [true, "Please enter the Password!"]
    },
    securityWuestions : [
        {
            question: String,
            answer: String,
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

passwordSchema.pre("save", async function(next){
    if(!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


passwordSchema.methods.isCorrectAnswer = async function (question, answer) {
    const securityQuestion = this.securityWuestions.find((q) => q.question === question);
    if(!securityQuestion) {
        return false;
    }
    return await bcrypt.compare(answer, securityQuestion.answer);
}

const Password = mongoose.model("Password", passwordSchema);
module.exports = Password;



 