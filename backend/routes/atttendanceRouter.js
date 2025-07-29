const express = require('express');
const { addAttendance, getAllAttendance, getByIdAttendance, getByStudentId } = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware');
const attendanceRouter = express.Router();

// ADD ATTENDANCE
attendanceRouter.post('/add', authMiddleware, addAttendance);

// GET ALL ATTENDANCE
attendanceRouter.get('/getByClass/:id', authMiddleware, getAllAttendance);

// GET ONE ATTENDANCE
attendanceRouter.get('/get/:id', authMiddleware, getByIdAttendance);

// GET BY STUDENT ID
attendanceRouter.get('/getByStudent/:id', authMiddleware, getByStudentId);

module.exports = attendanceRouter;