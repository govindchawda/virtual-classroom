const { default: mongoose } = require("mongoose");
const attendanceModel = require("../models/attendance");
const ObjectId = require("mongoose").Types.ObjectId;
// ADD ATTENDANCE
const addAttendance = async (req, res) => {
    try {
        const { classId, date, student } = req.body;

        if (!classId || !date || !student) {
            return res.status(500).json({
                success: false,
                message: "require all fields"
            });
        }
        const Classes = await attendanceModel.find();
        if(Classes){
            const exsistDate = Classes.filter((items)=> items?.date == date && items?.classId == classId);
            if(exsistDate.length > 0){
                return res.status(200).json({
                        success:false,
                        message:"attendance is already exsist"
                    });
            }
        }
        const query = attendanceModel({ classId, date, student });
        const result = await query.save();
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }
        return res.status(200).json({
            success: true,
            message: "attendance is succesfully add",
            result,
        })
    } catch (error) {
        console.log("addAttendance error", error);
    }
};

// GET ALL STUDENTS
const getAllAttendance = async (req, res) => {
    try {
        const result = await attendanceModel.find({classId:req.params.id});
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }
        return res.status(200).json({
            success: true,
            message: "attendance is succesfully add",
            result,
        })
    } catch (error) {
        console.log("addAttendance error", error);
    }
};

// GET BY classId ID
const getByIdAttendance = async (req, res) => {
    try {
        const result = await attendanceModel.findById({_id:req.params.id});
        console.log("result",result)
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }
        return res.status(200).json({
            success: true,
            message: "attendance is succesfully add",
            result,
        })
    } catch (error) {
        console.log("addAttendance error", error);
    }
};

// GET BY Students ID
const getByStudentId = async (req, res) => {
    try {
        const studentId = req.params.id;
        const targetStudent = new ObjectId(req.params.id);
        const classes = await attendanceModel.find({"student.studentId":studentId}).populate("classId");

        if (!classes) {
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }

        const classData = {};
        classes.forEach((items,index)=>{
            const classKey = items?.classId?._id.toString() || "";
           
            const matchStudent = items?.student.find(s => s?.studentId?.toString()=== targetStudent.toString());
            if(!matchStudent){
                return;
            }

            if(!classData[classKey]){
                classData[classKey] = {
                    classId : items.classId,
                    record : []
                };
            }
            classData[classKey].record.push({
                date : items?.date,
                student : matchStudent
            })
        })
        const result = Object.values(classData);

        return res.status(200).json({
            success: true,
            message: "attendance is succesfully get",
            result,
        })
    } catch (error) {
        console.log("addAttendance error", error);
    }
};


module.exports = {
    addAttendance,
    getAllAttendance,
    getByIdAttendance,
    getByStudentId
}