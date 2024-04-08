const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const { sendMessage, getMessages } = require('../controllers/messageController');

const router = express.Router();

// GET all messages
router.get('/', (req, res) => {
  res.json({mssg: 'GET home/landing page'});
})

// GET a single message
router.get('/:receiverID', getMessages);

// POST a message
router.post('/:receiverID', sendMessage);

module.exports = router;