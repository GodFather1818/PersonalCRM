const mongoose = require("mongoose");



const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "The Title of the Task Cannot remain Empty!"]
    },
    details: {
        type: Array, // Defines details as an object here
        required: [true, "The details of the task cannot remain empty!"],
        of: {
            type: Object,
            properties: {
                title: String, 
                description: String,
            }
        }
    },
    priority: {
        type: Number,
        required: [true, "The priority of the task should be assigned!"]
    },
    deadline: {
        type: Date,
        required: [true, "The Deadline of the date must be assigned!"]
    },
    assignee: {
        type: String,
        required: [true, "Oops! You didn't write the Assignee's name!"]
    },
    status: {
        type: String, 
        required: [true, "Write the status, from Planned or In Progress or Completed!"]
    }, // planned, in progress, completed
    reminder: {
        type: Date, 
        required: [true, "Please Enter the Reminder Date!"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function (value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
          },
          message: 'Invalid email address format',
        },
    },
  });


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;

