const express = require("express");
const router = express.Router();
const rooms = {};
const server = require("http").Server(router);
const io = require("socket.io")(server);

router.get("/", (request, require) => {
  return rooms;
});

router.post("/room", (req, res) => {
  let room = makeid(8);
  while (rooms[room] != null) {
    room = makeid(8);
  }
  rooms[room] = { users: {} };
  console.log(room);
  io.emit("room-created", room);
  return res.status(200).send({
    room,
  });
});

io.on("connection", (socket) => {
  socket.on("new-user", (room, name) => {
    console.log(name);
    socket.join(room);
    rooms[room].users[socket.id] = name;
    socket.to(room).emit("user-connected", name);
  });
  socket.on("send-chat-message", (room, message) => {
    socket.to(room).emit("chat-message", {
      message: message,
      name: rooms[room].users[socket.id],
    });
  });
  socket.on("send-pause-message", (room, message) => {
    console.log(message);
    socket.to(room).emit("chat-message", {
      message: message,
      name: rooms[room].users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    getUserRooms(socket).forEach((room) => {
      socket
        .to(room)
        .broadcast.emit("user-disconnected", rooms[room].users[socket.id]);
      delete rooms[room].users[socket.id];
    });
  });
});

server.listen(6000);

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}

router.get("/:room", (req, res) => {
  if (rooms[req.params.room] == null) {
    return res.redirect("/");
  }
  res.render("room", { roomName: req.params.room });
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = router;
