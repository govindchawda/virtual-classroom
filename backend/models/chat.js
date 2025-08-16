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
    default: "",
  },
    fileUrl: {
    type: String, // cloudinary url
    default: null,
  },
  fileType: {
    type: String, // image/png, video/mp4, application/pdf
    default: null,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes',
    required: true
  },

},{ timestamps: true });


const chatModel = mongoose.model('chat', chatSchema);
module.exports = chatModel;