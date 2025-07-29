const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"classes"
    },
    date:{
        type: String,
        require: true,
        // default: date.now(),
    },
    student: [ ]
},{ timestamps: true });

const attendanceModel = mongoose.model("attendance", attendanceSchema);
module.exports = attendanceModel;

