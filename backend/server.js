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
const Journal = require("./models/journalModel");
const Password = require("./models/Password");
const User = require('./models/user');
const bcrypt = require("bcrypt");
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

//  ----------------------------      AUTHENTICATION ROUTEES      --------------------
app.get("/register", (req, res)=> {

});

app.post("/register",async (req, res)=> {

    const {username, email, password} = req.body;

    try {

      const existingUser = await User.findOne({email: email});
      if(user) {
        return res.status(409).send({message: "User Already Exists!"});
      }

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({...req.body, password:hashedPassword}).save();
      res.status(201).send({message: "User Created Succesfully"});

    } catch (error) {
      res.status(500).send({message: "Internal Server Error!"});
    }

});


app.post("/login", async(req, res)=> {
  const {email, password} = req.body;

  try {
    
    const user = await User.findOne({email: req.body.email});
    if(!user) {
      return res.status(401).send({message: "Invalid Email or Password!"});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send({message: "Invalid Email or Password!"});
    }

    const token = user.generateAuthToken();
    res.status(200).send({data: token, message:"Logged In Successfully!"});

  } catch (error) {
    res.status(500).send({message: "Internal Server Error!"});
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

//  ------------------- password manager routes --------------------


app.post("/password-manager/new", async (req, res) => {
  try {
      const { website, password, securityQuestions } = req.body;

      // Hashing the answers of the security questions
      const hashedQuestions = await Promise.all(
          securityQuestions.map(async (q) => ({
              question: q.question,
              answer: await bcrypt.hash(q.answer, 10),
          }))
      );

      const newPassword = new Password({
          website,
          password, // Store the password directly
          securityQuestions: hashedQuestions,
      });

      await newPassword.save();
      res.json({ message: "Password Saved Successfully" });
  } catch (error) {
      console.error("Error Saving Password: ", error);
      res.status(500).json({ message: "Server Error!" });
  }
});

app.get("/password-manager", async (req, res)=>{
  try {
    const passwords = await Password.find().select('website date securityQuestions');
    res.json(passwords);
  }catch(error) {
    console.error("Error while fetching the passwords: ", error);
    res.json({message: "Server Error!"});
  }
});

app.delete("/password-manager/:id", async(req, res)=> {
    await Password.findByIdAndDelete(req.params.id);
    res.json({message: "Password Entry deleted"});
});


app.post("/password-manager/verify", async (req, res) => {
  try {
      const { id, answers } = req.body;
      const passwordEntry = await Password.findById(id);

      if (!passwordEntry) {
          return res.status(404).json({ message: "Password Entry Not Found!" });
      }

      const isCorrect = await Promise.all(
          answers.map((answer) => passwordEntry.isCorrectAnswer(answer.question, answer.answer))
      );

      if (isCorrect.every((result) => result)) {
          res.json({ password: passwordEntry.password });
      } else {
          res.status(401).json({ message: "Incorrect answers" });
      }
  } catch (error) {
      console.error("Error verifying answers: ", error);
      res.status(500).json({ message: "Server Error!" });
  }
});


// ------------Listening the App ----------------

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
