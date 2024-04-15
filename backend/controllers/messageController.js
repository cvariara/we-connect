const Message = require('../models/messageModel.js');
const User = require('../models/UserModel.js');

const io = require('../server').io;

const sendMessage = async (req, res) => {
  try {
    const receiverID = req.params.receiverID;
    const { senderID, content } = req.body;
    
    // check if sender and receiver are friends
    const [sender, receiver] = await Promise.all([
      User.findById(senderID).populate('friends'),
      User.findOne({ username: receiverID })
    ]);

    if (!sender || !receiver || !sender.friends.some(friend => friend._id.equals(receiver._id))) {
      return res.status(400).json({ error: 'Sender and receiver are not friends' });
    }

    // Create and save the message
    const message = new Message({
      sender: senderID,
      receiver: receiver._id,
      content: content
    });

    await message.save();

    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// This function can be used to handle receiving messages via Socket.io
const receiveMessage = async (socket) => {
  socket.on('join', (receiverID) => {
    // Join a room based on the receiver's ID
    socket.join(`messages:${receiverID}`);
  });
}

const getMessages = async (req, res) => {
  try {
    const receiverID = req.params.receiverID;
    const senderID = req.query.senderID;

    const receiver = await User.findOne({ username: receiverID });
    
    const messages = await Message.find({
      $or: [
        { sender: senderID, receiver: receiver._id },
        { sender: receiver._id, receiver: senderID }
      ]
    })
      .populate('sender', 'username firstName lastName fullName')
      .populate('receiver', 'username firstName lastName fullName')
      .sort({ timestamp: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages: ', error);
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  sendMessage,
  getMessages,
  receiveMessage
}