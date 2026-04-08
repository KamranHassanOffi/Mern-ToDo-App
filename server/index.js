const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoModel = require('./Models/Todo');

const app = express();


app.use(cors({
  origin: "https://mern-to-do-app-z9yf.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// 3. DATABASE CONNECTION

mongoose.connect('mongodb+srv://kamranhassan20044_db_user:kamran123@cluster0.5srhfa8.mongodb.net/todos')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB connection error:", err));

// ROUTES
app.get("/", (req, res) => {

    res.json("Hello! Backend is running successfully.");

});

app.get('/get', (req, res) => {
  todoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.post('/add', (req, res) => {
  const task = req.body.task;
  todoModel.create({ task: task })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  todoModel.findByIdAndUpdate(id, { task: req.body.task }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  todoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

module.exports = app;
