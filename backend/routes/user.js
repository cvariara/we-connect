const express = require('express');
const multer = require('multer');
const path = require('path');

// Multer configuration for storing files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../backend/public/images'));
    // Change the path to go up two levels to reach the correct directory
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${Math.round(Math.random() * 1E9)}.${fileExtension}`;
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg, and .jpeg formats are allowed!'));
    }
  },
  limits: { fileSize: 2000000 } // Limit image upload to 2MB
});

// Import controllers
const {
  loginUser,
  signupUser,
  getUser,
  getUsersFriends,
  updateUser
} = require('../controllers/userController');

const router = express.Router();

// login
router.post('/login', loginUser);

// sign-up
router.post('/signup', upload.single('profilePicture'), signupUser);

// get user by id
router.get('/profile/:username', getUser);

// update user
router.put('/profile/:id', upload.single('profilePicture'), updateUser);

// get user friends list
router.get('/profile/:username/friends', getUsersFriends);

module.exports = router;
