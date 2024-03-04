const express = require('express');
const multer = require('multer');

// Multer configuration for storing files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const fileExtention = file.originalname.split('.')[1];
    const fileName = `${Math.round(Math.random() * 1E9)}.${fileExtention}`;
    cb(null, fileName);
  }
});

const upload = multer({storage:storage,fileFilter: (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}, limits: { fileSize: 2000000 }}); // limit image upload to 2MB

// controllers
const { loginUser, signupUser, getUser, getUsersFriends, updateUser } = require('../controllers/userController');

const router = express.Router();

// login
router.post('/login', loginUser);

// sign-up
router.post('/signup', upload.single('profilePicture'), signupUser);

// get user by id
router.get('/profile/:username', getUser);

// update user
router.put('/profile/:username', updateUser);

// get user friends list
router.get('/profile/:username/friends', getUsersFriends);

module.exports = router;