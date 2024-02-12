const express = require('express');

const { 
  sendFriendRequest, 
  getFriendRequest, 
  acceptFriendRequest,
  declineFriendRequest
} = require('../controllers/friendshipController');

const router = express.Router();

// send friend request
router.post('/send', sendFriendRequest);

// get friend request
router.get('/pending-requests/:userID', getFriendRequest);

// accept friend request
router.post('/:friendshipID/accept', acceptFriendRequest);

// deny friend request
router.post('/:friendshipID/decline', declineFriendRequest);

module.exports = router;