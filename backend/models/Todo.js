import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Todo = new Schema({
    token: String,
    id: Number,
    text: String,
    info: String,
    completed: Boolean,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', Todo);
