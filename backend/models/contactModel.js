const mongoose = require("mongoose");

const indiaPhoneRegExp = /^\+?91\d{10}$/;


const contactsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name!"],
    }, 
    email: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          message: 'Invalid email address format',
        },
    }, 
    phone: {
        type: String,
        required: true,
        unique: true,
        match: indiaPhoneRegExp,
        message: 'Please enter a valid Indian phone number.',
    },
    group: {
        type: String,
        required: [true, "Please Select any of the Group."]
    },

});

const Contacts = mongoose.model("Contact", contactsSchema);
module.exports = Contacts;
