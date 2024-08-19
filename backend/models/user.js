require("dotenv").config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "Please Enter your Valid First Name!"]
    },
    lastName: {
        type: String,
        required: [true, "Please Enter your Valid Last Name!"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your Valid Email-Address!"]
    },
    password: {
        type: String,
        required: [true, "Please Enter your Valid Passowrd!"]
    },
});

userSchema.methods.generateAuthToken = function () {
    
    const token = jwt.sign({_id:this._id}, process.env.SECRET_KEY,{ expiresIn:"7d"});
    return token;

}

const User = mongoose.model("User", userSchema);
module.exports = User;


