const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose')
const app=express();
const todoModel=require('./Models/Todo');

app.use(cors({
  origin: "https://my-todo.vercel.app", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todoapp',)

app.get('/get', (req,res)=>{
    todoModel.find()
    .then(result=> res.json(result))
    .catch(err=> res.json(err))
})

app.post('/add',(req,res)=>{
    
    const task=req.body.task;
    todoModel.create({
        task:task
    }).then(result=> res.json(result))
    .catch(err=> res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const {id} = req.params;
    todoModel.findByIdAndUpdate(id,{task:req.body.task})
    .then(result=> res.json(result))
    .catch(err=> res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params;
    todoModel.findByIdAndDelete(id)
    .then(result=> res.json(result))
    .catch(err=> res.json(err))
})


app.listen(5000,()=>{
    console.log("Server is running on port 5000");
})