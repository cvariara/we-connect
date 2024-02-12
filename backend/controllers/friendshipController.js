const Friendship = require('../models/friendshipModel');
const User = require('../models/UserModel');

// send friend request
const sendFriendRequest = async (req, res) => {
  try {
    const { senderID, receiverID } = req.body;

    // check if friendship exists
    const exists = await Friendship.findOne({ sender: senderID, receiver: receiverID });
    if (exists) {
      return res.status(400).json({ error: 'Friend already exists' });
    }

    // send friend request
    const pending = new Friendship({
      sender: senderID,
      receiver: receiverID,
      status: 'pending',
    });

    await pending.save();

    res.status(200).json({ pending });
  } catch (error) {
    res.status(500).json({ error: 'Internal Serval Error' });
  }
}

// get friend request
const getFriendRequest = async (req, res) => {
  try {
    const { userID } = req.params;

    const pending = await Friendship.find({ receiver: userID, status: 'pending' })
      .populate('sender', 'firstName lastName username profilePicture');
    
    res.status(200).json({ pending });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  sendFriendRequest,
  getFriendRequest,
  acceptFriendRequest
}