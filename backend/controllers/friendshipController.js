const Friendship = require('../models/friendshipModel');
const User = require('../models/userModel');

// send friend request
const sendFriendRequest = async (req, res) => {
  try {
    const { senderID, receiverID } = req.body;

    if (senderID === receiverID) {
      return res.status(400).json({ error: 'Cannot add yourself' })
    }

    const [sender, receiver] = await Promise.all([
      User.findOne({ username: senderID}),
      User.findOne({ username: receiverID}),
    ]);

    if (!receiver) {
      res.status(400).json({ error: 'Username not found' });
    }

    // check if friendship exists
    const exists = await Friendship.findOne({ sender: sender._id, receiver: receiver._id });
    if (exists) {
      return res.status(400).json({ error: 'Friend already exists or is pending' });
    }

    // send friend request
    const pending = new Friendship({
      sender: sender._id,
      receiver: receiver._id,
      status: 'pending',
    });

    await pending.save();

    res.status(200).json({ pending });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// get friend request
const getFriendRequest = async (req, res) => {
  try {
    const { userID } = req.params;

    const receiver = await User.findOne({ username: userID });

    if (!receiver) {
      res.status(404).json({ error: "User not found" });
    }

    const pending = await Friendship.find({ receiver: receiver._id, status: 'pending' })
      .populate('sender', 'firstName lastName username profilePicture pfpurl');
    
    res.status(200).json({ pending });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const acceptFriendRequest = async (req, res) => {
  try {
    const { friendshipID } = req.params;

    // find friendship
    const friendship = await Friendship.findById(friendshipID);

    if (!friendship) {
      res.status(404).json({ error: "Friendship not found" });
    }

    friendship.status = 'accepted';
    await friendship.save();

    // add each user to each other's friends list
    const [sender, receiver] = await Promise.all([
      User.findById(friendship.sender),
      User.findById(friendship.receiver),
    ]);

    if (!sender || !receiver) {
      res.status(404).json({ error: "User(s) not found" });
    }

    sender.friends.push(receiver._id);
    receiver.friends.push(sender._id);

    await sender.save();
    await receiver.save();

    res.status(200).json({ message: 'Friendship accepted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const declineFriendRequest = async (req, res) => {
  try {
    const { friendshipID } = req.params;

    // Find and remove the friendship by its ID
    const deletedFriendship = await Friendship.findByIdAndDelete(friendshipID);

    if (!deletedFriendship) {
      return res.status(404).json({ error: "Friendship not found" });
    }

    res.status(200).json({ message: "Friendship declined successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  sendFriendRequest,
  getFriendRequest,
  acceptFriendRequest,
  declineFriendRequest
}