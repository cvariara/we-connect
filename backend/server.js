require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const messageController = require('./controllers/messageController');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');
const friendshipRoutes = require('./routes/friendship');

// express app
const app = express();

const ___dirname = path.resolve();

// middleware
//app.use(cors({origin: "http://localhost:5173"}));



app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use(express.static('public/'));

// routes
app.use('/api/messages', messageRoutes);
app.use('/api/user', userRoutes);
app.use('/api/friendship', friendshipRoutes);

// Serve static files from frontend/dist
const frontendDistPath = path.join(___dirname, 'frontend', 'dist');
app.use(express.static(frontendDistPath));

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

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