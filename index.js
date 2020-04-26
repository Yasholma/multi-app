const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");
const moment = require("moment");

const todoController = require("./controllers/todoController");
const chatController = require("./controllers/chatController");

const app = express();
const server = http.Server(app);

mongoose
    .connect(
        "mongodb+srv://holma:mongo@todo-rinr7.mongodb.net/test?retryWrites=true&w=majority",
        { useUnifiedTopology: true, useNewUrlParser: true },
    )
    .then(msg => {
        console.log("Connection to db was successful");
    })
    .catch(err => {
        console.log(err);
    });

app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

// Init
todoController(app);
chatController(app);

const PORT = process.env.NODE_ENV === "production" ? process.env.PORT : 3000;

server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

const io = socketIO(server);

io.on("connection", socket => {
    console.log("User connected");
    socket.on("send-message", (data, callback) => {
        let mod = {
            ...data,
            time: moment(data.time).calendar(),
        };
        socket.broadcast.emit("new-message", {
            data: mod,
        });
        callback({ status: true, data: mod });
    });
});
