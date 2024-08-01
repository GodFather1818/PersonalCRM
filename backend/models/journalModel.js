const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter your Title"]
    }, 
    content: {
        type: String,
        required: [true, "Please Enter the Content"]
    }, 
    isPrivate: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const Journals = mongoose.model("Journal", journalSchema);
module.exports = Journals;