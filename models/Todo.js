const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    item: String,
    completed: Number,
    duration: String,
});

const Todo = mongoose.model("todos", todoSchema);

module.exports = Todo;
