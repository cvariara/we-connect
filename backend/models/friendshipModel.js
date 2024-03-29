const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const friendshipModel = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'none'], default: 'none' },
});

module.exports = mongoose.model('Friendship', friendshipModel);