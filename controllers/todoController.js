const Todo = require("../models/Todo");

module.exports = function (app) {
    app.get("/todo", (req, res) => {
        Todo.find((err, data) => {
            if (err) return res.status(500).send({ error: "Network Issues" });
            res.render("todo", { todos: data });
        });
    });

    app.post("/todo", function (req, res) {
        const { item, duration, completed } = req.body;
        const newTodo = Todo({
            item: item,
            duration: duration,
            completed: completed,
        });
        newTodo.save((err, data) => {
            if (err) return res.status(500).send({ error: "Network Issues" });
            res.json(data);
        });
    });

    app.put("/todo/:itemId", (req, res) => {
        const { itemId } = req.params;
        Todo.updateOne({ _id: itemId }, { completed: 1 }, (err, data) => {
            if (err) return res.status(500).send({ error: "Network Issues" });
            res.json(data);
        });
    });

    app.delete("/todo/:itemId", (req, res) => {
        const { itemId } = req.params;
        Todo.deleteOne({ _id: itemId }, (err, data) => {
            if (err) return res.status(500).send({ error: "Network Issues" });
            res.json(data);
        });
    });
};
