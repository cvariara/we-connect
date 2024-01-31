const express = require('express');

// controllers
const { loginUser, signupUser, getUser } = require('../controllers/userController');

const router = express.Router();

// login
router.post('/login', loginUser);

// sign-up
router.post('/signup', signupUser);

// get user by id
router.get('/profile/:username', getUser)

module.exports = router;