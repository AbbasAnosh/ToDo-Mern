import mongoose from 'mongoose';


const todoSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 300 },
    author:  {type: String,  minlength: 4, maxlength: 40 },
    id: String,
    completed: Boolean,
    date: { type: Date, default: new Date() },
})


const todoModel = mongoose.model('todo', todoSchema);
export default todoModel;