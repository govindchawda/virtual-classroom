const express = require("express");
const { register, loginuser, getalluser, getuser, deleteuser, edituser, updateuser, resetpassword, getstudents, getallstudents, getallteachers } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const userroute = express.Router();

// REGISTER USER
userroute.post('/register', register);

// LOG IN USER
userroute.post('/login', loginuser)

// DELETE USER
userroute.delete('/deleteusers/:id', authMiddleware,  deleteuser);

// EDIT USER  || GET ONE USER
userroute.get('/editusers/:id', authMiddleware,  edituser);

// GET MULTIPLE STUDENTS BY ID
userroute.get('/getStudents/:id', authMiddleware,  getstudents);

// UPDATE USER 
userroute.post('/updateusers', updateuser);

// GET ALL USERS
userroute.get('/getallusers', authMiddleware,  getalluser);

// GET ALL STUDENTS
userroute.get('/getallstudents', authMiddleware,  getallstudents);

// GET ALL TEACHERS
userroute.get('/getallteachers', authMiddleware,  getallteachers);

// GET SELF
userroute.get('/getusers', authMiddleware,  getuser);

// RESET PASSWORD
userroute.post('/resetpasswords',  resetpassword);


module.exports = userroute;