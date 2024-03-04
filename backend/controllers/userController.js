const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ username, _id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

    res.status(200).json({ username, _id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

const updateUser = async (req, res) => {
  const { username } = req.params;
  const { firstName, lastName, username: newUsername, profilePicture } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { username: username }, 
      { $set: { firstName, lastName, username: newUsername, profilePicture } },
      { new: true }
    );

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
};

module.exports = {
  loginUser,
  signupUser,
  getUser,
  getUsersFriends,
  updateUser
}