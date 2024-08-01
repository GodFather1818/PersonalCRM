// Requiring the Packages.

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Task = require("./models/taskModel");
const Contacts = require("./models/contactModel");
const Journal = require("./models/journalModel")
console.log("MongoDB URI", process.env.URI);

// Initializing them for the usage.
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true, // This option is deprecated but might still be needed in older Mongoose versions
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected Successfully!");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Email service
  auth: {
    user: process.env.MAILID,
    pass: process.env.PASSWORD,
  },
});

const sendReminderEmail = (task) => {
  const mailOptions = {
    from: process.env.MAILID,
    to: task.email ,
    subject: `Reminder: ${task.title}`,
    text: `This is a reminder for your task: ${
      task.title
    }. Details: ${task.details
      .map((detail) =>  detail)
      .join(", ")}. Deadline: ${new Date(task.deadline).toLocaleDateString()}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const soon = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now
  const tasks = await Task.find({ reminder: { $gte: now, $lte: soon } });

  try {
    // Find tasks with reminders set to trigger in the next 5 minutes
    const tasks = await Task.find({ reminder: { $gte: now, $lte: soon } });

    // Send reminder emails for each task
    tasks.forEach(task => {
      sendReminderEmail(task);
    });
  } catch (error) {
    console.error('Error fetching tasks or sending emails:', error);
  }
});

// -----------------                  For Task Route             ----------------------------

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find().sort({ priority: 1 });
  console.log(tasks);
  res.json(tasks);
});

app.get("/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  console.log(taskId);

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.json({ message: "Invalid task ID format" });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.json({ message: "Server error" });
  }
});

app.post("/tasks/createone", async (req, res) => {
  try {
    const { email, title, details, priority, deadline, assignee, status, reminder } =
      req.body;
    console.log(req.body);
    const newTask = new Task({
      email,
      title,
      details,
      priority,
      deadline,
      assignee,
      status,
      reminder,
    });
    console.log(newTask);
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.json({ message: "Error creating task", error });
  }
});

app.delete("/tasks/:taskId", async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.json({ message: "Task deleted" });
});


// -------------------                           For Contacts Route            ------------------------------------

app.get("/contacts", async(req, res) => {
  try {
    const contacts = await Contacts.find()
    console.log(contacts);
    res.json(contacts);
  }catch(error) {
    res.status(500).json({ message: "Error fetching contacts", error });  }
});

app.delete("/contacts/:contactId", async(req, res)=>{
  try {
    await Contacts.findByIdAndDelete(req.params.contactId);
    if (!contact) return res.json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.json({ message: "Error deleting contact", error });
  }
});

app.post("/contacts/createone", async (req, res)=>{ 
  const contact = new Contacts({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    group: req.body.group,
  }); 
  console.log(contact);
  try {
    console.log("Inside the Try Block")
    const newContact = await contact.save();
    console.log("Cotact Saved Successfully from the server side as well!: ", newContact);
    res.json(newContact);

  }catch (err) {
    res.json({message: err.message});
  }
});

//  ---------------------------------------- For Journal Routes ------------------------

app.get('/entries', async (req, res) => {
  const entries = await Journal.find();
  res.json(entries);
});

app.post('/entries', async (req, res) => {
  const { title, content, isPrivate } = req.body;
  const newEntry = new Journal({ title, content, isPrivate });
  await newEntry.save();
  res.json(newEntry);
});

app.get('/entries/:id', async (req, res) => {
  const entry = await Journal.findById(req.params.id);
  res.json(entry);
});

app.put('/entries/:id', async (req, res) => {
  const { title, content, isPrivate } = req.body;
  const updatedEntry = await Journal.findByIdAndUpdate(
    req.params.id,
    { title, content, isPrivate },
    { new: true }
  );
  res.json(updatedEntry);
});

app.delete('/entries/:id', async (req, res) => {
  await Journal.findByIdAndDelete(req.params.id);
  res.json({ message: 'Entry deleted' });
});






app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
