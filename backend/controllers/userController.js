const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

// login user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({username, token});
  } catch (error) {
    res.status(400).json({error: error.message});
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

    res.status(200).json({email, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {
  loginUser,
  signupUser
}