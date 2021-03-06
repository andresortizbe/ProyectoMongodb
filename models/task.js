const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskSchema = new Schema({
    user_id: String, 
    content: String,
    date: Date,
    is_completed: Boolean,
    categories: Array,
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;