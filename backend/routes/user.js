const express = require('express');

// controllers
const { loginUser, signupUser, getUser, getUsersFriends, updateUser } = require('../controllers/userController');

const router = express.Router();

// login
router.post('/login', loginUser);

// sign-up
router.post('/signup', signupUser);

// get user by id
router.get('/profile/:username', getUser);

// update user
router.patch('/profile/:username', updateUser);

// get user friends list
router.get('/profile/:username/friends', getUsersFriends);

module.exports = router;