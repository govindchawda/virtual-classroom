const registerModel = require("../models/register");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudniry = require("../cloudinary");
const { default: mongoose } = require("mongoose");
const path = require('path');

// REGISTER USER
const register = async (req, res) => {
    try {

        const { name, email, password, role, gender, profile, } = req.body;

        // check fields empty or not
        if (!name || !email || !password || !gender) {
            return res.status(202).json({
                success: false,
                message: "feel all input fields"
            });
        }

        // CHECK VALID FILE IMAGE OR
        if (profile && profile.startsWith("data:image/")) {
            const mimeType = profile.split(";")[0].split(":")[1]; //["data:image/jpeg";"base64", "/9j/4AA..."]
            const extension = mimeType.split("/")[1]; // ["image", "jpeg"]
        } else {
            return res.status(202).json({
                success: false,
                message: "Invalid image file"
            });
        }

        // ckeck email is exist
        const existemail = await registerModel.findOne({ email })
        if (existemail) {
            return res.status(202).json({
                success: false,
                message: "email is already exist"
            })
        }

        // save photo cloudinary
        const userprofile = await cloudniry.uploader.upload(profile, {
            folder: "userProfile"
        });
        if (!userprofile) {
            return res.status(202).json({
                success: false,
                message: "profile is not saved"
            });
        }

        // password is bcrypted
        const bcryptpassword = await bcrypt.hash(password, 10);
        if (!bcryptpassword) {
            return res.status(202).json({
                success: false,
                message: 'password is not bcrypted'
            });
        }
        const query = registerModel({ name, email, password: bcryptpassword, role, gender, profile: userprofile.secure_url });
        const user = await query.save();
        if (!user) {
            res.status(202).json({
                success: false,
                message: "user is not save"
            })
        }
        return res.status(200).json({
            success: true,
            message: "user is saved"
        })
    } catch (error) {
        console.log(`register auth error ${error}`);
    }
}

// LOG IN USER
const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(202).json({
                success: false,
                message: "Please enter required fields"
            });
        }
        // CHECK EMAIL
        const user = await registerModel.findOne({ email });
        if (!user) {
            return res.status(202).json({
                success: false,
                message: "email is not match"
            });
        }

        // CONFIRM PASSWORD
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(202).json({
                success: false,
                message: "password is not match"
            });
        }

        // GENERATE TOKEN
        const token = await jwt.sign({ authId: user._id }, process.env.PRIVATE_AUTH_KEY);
        if (!token) {
            return res.status(202).json({
                success: true,
                message: "token is not generate"
            });
        }
        return res.status(200).json({
            success: true,
            message: "login succesfully",
            token,
            result,
            user
        })
    } catch (error) {
        console.log(`login auth error ${error}`);
    }
}

// GET ALL USER
const getalluser = async (req, res) => {
    try {
        const result = await registerModel.find();
        if (!result) {
            return res.status(202).json({
                success: true,
                message: "users not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "users is succesfully get",
            result
        });
    } catch (error) {
        console.log(`get all user error ${error}`)
    }
}

// GET ALL STUDENTS
const getallstudents = async (req, res) => {
    try {
        const student = await registerModel.find();
        if (!student) {
            return res.status(202).json({
                success: true,
                message: "users not found"
            });
        }
        const result = student.filter((items, index) => {
            return items.role === "student"
        });
        return res.status(200).json({
            success: true,
            message: "users is succesfully get",
            result
        });
    } catch (error) {
        console.log(`get all user error ${error}`)
    }
}


// GET ALL TEACHERS
const getallteachers = async (req, res) => {
    try {
        const student = await registerModel.find();
        if (!student) {
            return res.status(202).json({
                success: true,
                message: "users not found"
            });
        }
        const result = student.filter((items, index) => {
            return items.role === "teacher"
        });
        return res.status(200).json({
            success: true,
            message: "users is succesfully get",
            result
        });
    } catch (error) {
        console.log(`get all user error ${error}`)
    }
}

// GET SELF USER
const getuser = async (req, res) => {
    try {
        const result = await registerModel.findById({ _id: req.body.tokenId });
        if (!result) {
            return res.status(202).json({
                success: true,
                message: "user not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "user is succesfully get",
            result
        });
    } catch (error) {
        console.log(`get self user error ${error}`);
    }
}

// DELETE USER
const deleteuser = async (req, res) => {
    try {
        const user = await registerModel.findById({ _id: req.params.id });
        if (!user) {
            return res.status(202).json({
                success: false,
                success: "user id not found"
            });
        }
        const imageurl = user.profile
        const imageLastName = imageurl.split("/").pop().split(".")[0];
        await cloudniry.uploader.destroy(`userProfile/${imageLastName}`);

        const result = await registerModel.findByIdAndDelete({ _id: req.params.id });

        if (!result) {
            return res.status(202).json({
                success: false,
                message: "user not deleted"
            });
        }
        return res.status(200).json({
            success: true,
            message: "user is succesfully deleted",
            result
        });
    } catch (error) {
        console.log(`delete user error ${error}`)
    }
}

// EDIT USER
const edituser = async (req, res) => {
    try {
        const result = await registerModel.findById({ _id: req.params.id });
        if (!result) {
            return res.status(202).json({
                success: false,
                message: "edit user not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "user is succesfully get",
            result
        });
    } catch (error) {
        console.log(`edit user error ${error}`)
    }
}

// GET STUDENTS
const getstudents = async (req, res) => {
    try {
        const student = req.params.id;
        // console.log("student",student)
        if (!student) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
        const data = student.split(',');
        // if (!mongoose.Types.ObjectId.isValid(data)) {
        //     console.log("data",data)
        //     return res.status(400).json({ error: "Invalid MongoDB ObjectId" });
        // }
        const result = await registerModel.find({ _id: data });
        // console.log("result",result)
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
        return res.status(200).json({
            success: true,
            message: "user is succesfuly get",
            result
        });
    } catch (error) {
        console.log('get student user error', error)
    }
}


// UPDATE USER
const updateuser = async (req, res) => {
    try {
        const { _id, name, email, gender, profile } = req.body;

        // CHECK VALID FILE IMAGE OR
        if (profile && profile.startsWith("data:image/") || profile.startsWith("http")) {
            const mimeType = profile.split(";")[0].split(":")[1]; //["data:image/jpeg";"base64", "/9j/4AA..."]
            const extension = mimeType.split("/")[1]; // ["image", "jpeg"]
        } else {
            return res.status(202).json({
                success: false,
                message: "Invalid image file"
            });
        }
        if (!_id || !name || !email) {
            return res.status(202).json({
                success: false,
                message: "user is not found"
            });
        }
        const user = await registerModel.findOne({ _id });
        if (!user) {
            return res.status(202).json({
                success: false,
                message: 'user is not found'
            });
        }

        let newimageurl = user.profile;
        if (profile != user.profile) {
            if (user.profile) {
                const userImage = user.profile;
                const userImageUrl = userImage.split("/").pop().split(".")[0]
                await cloudniry.uploader.destroy(`userProfile/${userImageUrl}`);
            }
            const uploadimageurl = await cloudniry.uploader.upload(profile, {
                folder: "userProfile"
            });
            newimageurl = uploadimageurl.secure_url;
        }

        const result = await registerModel.findByIdAndUpdate(_id, { name, email, gender, profile: newimageurl },
            { new: true, runValidators: true });
        if (!result) {
            return res.status(202).json({
                success: false,
                message: "user is not update"
            });
        }
        return res.status(200).json({
            success: true,
            message: 'user is succesfully update',
            result
        })
    } catch (error) {
        console.log("update user error", error)
    }
}

// RESET PASSWORD
const resetpassword = async (req, res) => {
    try {
        const { email, new_password } = req.body;
        if (!email, !new_password) {
            return res.status(202).json({
                success: false,
                message: "please fill all fields"
            });
        }
        const user = await registerModel.findOne({ email });
        if (!user) {
            return res.status(202).json({
                success: false,
                message: "email is no match"
            });
        }
        const updatePassword = await bcrypt.hash(new_password, 10);
        user.password = updatePassword;
        const result = await user.save();
        if (!result) {
            return res.status(202).json({
                success: true,
                message: "user password is valid"
            });
        };
        return res.status(200).json({
            success: true,
            message: "password is succesfully updated"
        })
    } catch (error) {
        console.log(`update user error ${error}`)
    }
}

module.exports = {
    register,
    loginuser,
    getalluser,
    getuser,
    getallstudents,
    getallteachers,
    getstudents,
    deleteuser,
    edituser,
    updateuser,
    resetpassword
}