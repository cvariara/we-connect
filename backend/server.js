//import dotenv from "dotenv";
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');
const friendshipRoutes = require('./routes/friendship');
const { app, server } = require('./socket/socket.js')

const PORT = process.env.PORT || 4000;

const ___dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/messages', messageRoutes);
app.use('/api/user', userRoutes);
app.use('/api/friendship', friendshipRoutes);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(___dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(___dirname, "frontend", "dist", "index.html"));
});

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    server.listen(PORT, () => {
      console.log('Connected to DB');
      console.log(`Listening on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });