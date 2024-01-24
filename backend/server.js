require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const workoutRoutes = require('./routes/workouts');

const messageRoutes = require('./routes/messages');

// express app
const app = express();

// middleware
//app.use(cors({origin: "http://localhost:5173"}));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
// app.get('/', (req, res) => {
//   res.json({mssg: 'Welcome to the app'})
// })

app.use('/messages', messageRoutes);

// routes
//app.use('/api/workouts', workoutRoutes);

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