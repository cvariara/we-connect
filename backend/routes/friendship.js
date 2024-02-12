const express = require('express');

const { sendFriendRequest } = require('../controllers/friendshipController');

const router = express.Router();

// send friend request
router.post('/send', sendFriendRequest);

// accept friend request

// deny friend request

module.exports = router;