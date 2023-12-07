const express = require("express");
const dotenv = require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const user = require("./routes/userroute");
const chat = require("./routes/chatroute");
const message = require("./routes/messageroute");
const refresh = require("./routes/refreshroute");
const logout = require("./routes/logoutroute");
const mongoose = require("mongoose");
const mid = require("./middleware/verifyFirst");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));

app.use("/api/users", user);
app.use("/api/refresh", refresh);
app.use("/api/logout", logout);
app.use("/api/chats", chat);

app.use("/api/messages", message);

mongoose.connect(process.env.PASSWORD);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log("connected");
});

const io = require("socket.io")(server, {
  cors: { origin: "http://127.0.0.1:5173" },
});

io.on("connection", (socket) => {
  socket.on("setup", (data) => {
    socket.join(data);
    socket.emit("connected");
  });

  socket.on("join", (chat) => {
    socket.join(chat);
  });

  socket.on("send", (message) => {
    io.in(message.chatId).emit("recieve", message);
  });

  socket.on("disconnect", () => {});
});
