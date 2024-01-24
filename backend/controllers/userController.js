const User = require('../models/UserModel');

// login user
const loginUser = async (req, res) => {
  res.json({mssg: "Login User"});
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

    res.status(200).json({email, user});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

module.exports = {
  loginUser,
  signupUser
}