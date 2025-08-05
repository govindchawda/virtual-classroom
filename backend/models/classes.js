const { default: mongoose } = require("mongoose");

const classSchema = mongoose.Schema({
    tittle: {
        type: String,
        require: [true, "tittle is required"]
    },
    classCode: {
        type: String,
        require: [true, "classCode is required"]
    },
    // section: {
    //     type: String,
    //     require: [true, "section is required"],
    //     default: "A",
    //     enum: ["A", "B", "C"]
    // },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "register"
    },
    meeting: {
        type: String,
        require: [true, "section is required"],
    },
    joinRoom: {
        type: Boolean,
        required: [true, "joinRoom is required"],
        default: false
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "register"
        }
    ],
    schedule: [
        {
            day: {
                type: [String],
                required: true
            },
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            },
        }
    ]
}, { timestamps: true });

const classModel = mongoose.model("classes", classSchema);
module.exports = classModel;