const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({ 
    meetingLink: {
        type: String,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"classes"
    },
});

const roomModel = mongoose.model('Room', roomSchema);
module.exports = roomModel;