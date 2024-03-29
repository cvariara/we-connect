require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const messageController = require('./controllers/messageController');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');
const friendshipRoutes = require('./routes/friendship');

// express app
const app = express();

// middleware
app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.static('public/'));

// routes
app.use('/api/messages', messageRoutes);
app.use('/api/user', userRoutes);
app.use('/api/friendship', friendshipRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB');
      console.log(`Listening on port ${process.env.PORT}!`);
    });
  })
  .catch((error) => {
    console.log(error);
  });