const express = require('express');

// controllers
const { loginUser, signupUser, getUser, getUsersFriends, addFriends } = require('../controllers/userController');

const router = express.Router();

// login
router.post('/login', loginUser);

// sign-up
router.post('/signup', signupUser);

// get user by id
router.get('/profile/:username', getUser)

// get user friends list
router.get('/profile/:username/friends', getUsersFriends);

// add friends
router.post('/profile/:username/add-friend', addFriends);

module.exports = router;