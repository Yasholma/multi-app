const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todoController = require("./controllers/todoController");

const app = express();

app.use(require("easy-livereload")());

mongoose.connect(
    "mongodb+srv://holma:mongo@todo-rinr7.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true },
);

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

// Init
todoController(app);

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : 3000;

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
