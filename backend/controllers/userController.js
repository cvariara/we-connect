const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

// login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// sign-up user
const signupUser = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    profilePicture
  } = req.body;

  try {
    const user = await User.signup(
      firstName,
      lastName,
      username,
      email,
      password,
      profilePicture);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username: username }).populate('friends').select('-email -password');

    if (!user) {
      return res.status(404).json({ error: 'No such user' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsersFriends = async (req, res) => {
  const { username } = req.params;

  try {
    // Find the user by username and populate the 'friends' field
    const user = await User.findOne({ username }).populate('friends', 'firstName lastName username profilePicture');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const addFriends = async (req, res) => {
  try {
    const { username } = req.params;
    const { friendUsername } = req.body;

    const [user, friend] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ username: friendUsername })
    ]);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the friend is not already in the friends list
    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      friend.friends.push(user._id);
      await user.save();

      res.status(200).json({ message: 'Friend added successfully' });
    } else {
      res.status(400).json({ error: 'User is already a friend' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  loginUser,
  signupUser,
  getUser,
  getUsersFriends,
  addFriends
}