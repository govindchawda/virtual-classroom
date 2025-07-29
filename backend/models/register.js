const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true , "user name is required"]
    },
    email : {
        type : String ,
        required : [true, "user email is required"]
    },
    password : {
        type : String,
        required : [true, "user password is required"]
    },
    role : {
        type : String,
        required : [true , "user role is required"],
        default : "student",
        enum : ["student", "teacher" , "admin"]
    },
    gender : {
        type : String,
        required : [true , "user gender is required"],
        enum : ["male", "female", "custom"],
    },
    profile : {
        type : String,
        required : [true , "user profile is required"],
        default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
}, {timestamps:true});

const registerModel = mongoose.model("register",userSchema);
module.exports = registerModel;