const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  sender:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'register',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes',
    required: true
  },

});

const chatModel = mongoose.model('chat', chatSchema);
module.exports = chatModel;