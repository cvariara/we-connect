// // import { Server } from "socket.io";
// // import http from "http";
// // import express from "express";

// const { Server } = require('socket.io');
// const http = require('http');
// const express = require('express');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//   },
// })



// // const io = require('socket.io')(8900, {
// //   cors: {
// //     origin: "http://localhost:5173"
// //   }
// // });

// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some(user => user.userId === userId) &&
//     users.push({ userId, socketId });
// }

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// }

// const getUser = (userId) => {
//   return users.find(user => user.userId === userId);
// }

// io.on('connection', (socket) => {
//   // take user id and socket id from user
//   socket.on("addUser", userId => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

//   // send & get message
//   socket.on("sendMessage", ({senderId, receiverId, content}) => {
//     const user = getUser(receiverId);
//     io.to(user.socketId).emit("getMessage", {
//       senderId,
//       content,
//     })
//   })

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });

// module.exports = { app, server, io };

const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Adjust origin as needed
    methods: ["GET", "POST"],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        content,
      });
    } else {
      console.log(`User ${receiverId} not found.`);
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

module.exports = { app, server, io };
