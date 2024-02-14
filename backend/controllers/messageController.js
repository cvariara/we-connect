const Message = require('../models/messageModel');
const User = require('../models/UserModel');

const sendMessage = async (req, res) => {
  try {
    const receiverID = req.params.receiverID;
    const { senderID, content } = req.body;
    
    // check if sender and receiver are friends
    const [sender, receiver] = await Promise.all([
      User.findById(senderID).populate('friends'),
      User.findById(receiverID)
    ]);

    if (!sender || !receiver || !sender.friends.some(friend => friend._id.equals(receiver._id))) {
      return res.status(400).json({ error: 'Sender and receiver are not friends' });
    }

    // Create and save the message
    const message = new Message({
      sender: senderID,
      receiver: receiverID,
      content: content
    });

    await message.save();

    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getMessages = async (req, res) => {
  try {
    const receiverID = req.params.receiverID;
    const senderID = req.body.senderID;
    
    const messages = await Message.find({
      $or: [
        { sender: senderID, receiver: receiverID },
        { sender: receiverID, receiver: senderID }
      ]
    })
      .populate('sender', 'username firstName lastName fullName')
      .populate('receiver', 'username firstName lastName fullName')
      .sort({ timestamp: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  sendMessage,
  getMessages
}