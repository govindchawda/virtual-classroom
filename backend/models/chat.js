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
  fileType: {
    type: String, // image/png, video/mp4, application/pdf
    default: "text",
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes',
    required: true
  },

},{ timestamps: true });


const chatModel = mongoose.model('chat', chatSchema);
module.exports = chatModel;