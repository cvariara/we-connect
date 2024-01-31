require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');

// express app
const app = express();

// middleware
app.use(cors({origin: "http://localhost:5174"}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/messages', messageRoutes);
app.use('/api/user', userRoutes);

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