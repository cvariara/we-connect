const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all messages routes
router.use(requireAuth);

// GET all messages
router.get('/', (req, res) => {
  res.json({mssg: 'GET home/landing page'})
})

// GET a single message
router.get('/:id', (req, res) => {
  res.json({mssg: 'GET a single workout'})
})

// POST a message
router.post('/:id', (req, res) => {
  res.json({mssg: 'POST a new workout'})
})

module.exports = router