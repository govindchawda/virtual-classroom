const classModel = require("../models/classes");

const createClass = async (req, res) => {
    try {
        const { tittle, students, schedule, teacherId, classCode, meeting} = req.body;
        if (!tittle || !teacherId || !students || !classCode) {
            return res.status(400).json({
                success: false,
                message: 'please fill all require fields'
            });
        }

        const  exsistMeeting = await classModel.findOne({meeting});
        if (exsistMeeting) {
            return res.status(202).json({
                success: false,
                message: "meetingLink is already exist"
            })
        }

        const classes = classModel({ tittle, teacherId, students, schedule, classCode, meeting });
        const result = await classes.save();
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "Save operation failed"
            });
        }
        return res.status(202).json({
            success: true,
            message: "class is successfully created",
            result
        });
    } catch (error) {
        console.log(`create classes error : ${error}`)
    }
}


// DELETE CLASSES
const deleteClass = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({
                success: false,
                message: "class id is not found"
            })
        }
        const result = await classModel.findByIdAndDelete({ _id: req.params.id });
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "class is not deleted"
            });
        }
        return res.status(202).json({
            success: true,
            message: "class is succesfully deleted",
        });
    } catch (error) {
        console.log(`delete classes error : ${error}`)
    }
}

// GET ALL CLASSES
const getAllClass = async (req, res) => {
    try {
        const result = await classModel.find();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "classes is not found"
            });
        }
        return res.status(202).json({
            success: true,
            message: "classes is succesfully get",
            result
        });
    } catch (error) {
        console.log('get all classes error' + error)
    }
}

// EDIT CLASSES
const editClass = async (req, res) => {
    try {
        const result = await classModel.findById({ _id: req.params.id });
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "classes is not found"
            });
        }
        return res.status(202).json({
            success: true,
            message: "class is succesfully get",
            result
        });
    } catch (error) {
        console.log('edit classes error ' + error)
    }
}


// UPDATE CLASSES
const updateClass = async (req, res) => {
    try {
        const { _id, tittle, students, schedule, teacherId, classCode, meeting } = req.body;
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "class is not found"
            });
        }
        const result = await classModel.findByIdAndUpdate(_id, { tittle, students, schedule, teacherId, meeting, classCode });
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "classes is not update"
            });
        }
        return res.status(202).json({
            success: true,
            message: "class is succesfully update",
            result
        });
    } catch (error) {
        console.log('update classes error' + error)
    }
}

// DELETE STUDENTS FROM CLASSES 
const deletStudentFromClasses = async (req, res) => {
    try {
        const studentId = req.query.studentId;
        const classId = req.query.classId;

        const newClass = await classModel.findById({ _id: classId });
        if (!newClass) {
            return res.status(404).json({
                success: true,
                message: "internal server error"
            });
        }
        let newstudent = newClass.students.filter((items, index) => {
            return items.toString() !== studentId
        });
        const result = await classModel.findByIdAndUpdate({ _id: classId }, { students: newstudent },{ new: true, useFindAndModify: false });
        if (!result) {
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }
        return res.status(202).json({
            success: true,
            message: "student is successfully delted",
            result,
        })
    } catch (error) {
        console.log("delete students from classes error", error);
    }
}

// ADD Students For Class
const AddStudentForClasses = async (req, res) => {
    try {
        const { newStudent, classId } = req.body;
        if (!newStudent || !classId) {
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }
        const clas = await classModel.findById({ _id: classId });
        if (!clas) {
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }

        const isAlreadyStudent = clas.students.includes(newStudent.toString());

        if (isAlreadyStudent) {
            return res.status(202).json({
                success: false,
                message: "Student already exists in this class"
            });
        }

        // clas.students.push(newStudent);
        // const result = await clas.save();

        const result = await classModel.findByIdAndUpdate(classId,{$addToSet:{students:newStudent}},{new:true});

        if (!result) {
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }
        return res.status(202).json({
            success: true,
            message: "student is sucessfully add",
            result,
        });
    } catch (error) {
        console.log("add student for class error : " + error);
    }
}

// SHOW  Students INCLUDES IN Class
const showClassIncludeStudents = async (req, res) => {
    try {

        const studentId = req.params.id;
        const classes = await classModel.find();
        if (!classes) { 
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }

      const result =  classes.filter((items)=>{

            if(!Array.isArray(items.students)){
                return res.status(202).json({
                    success:false,
                    message:"interval error"
                });
            }

            const childs = items.students.map((items)=>(
                 items.toString()
            ));

            return childs.includes(studentId);
        })

        return res.status(200).json({
            success:true,
            message:"class is succes fully get",
            result
        })

    } catch (error) {
        console.log("show classes includ students", error);
    }
}

// SHOW Students INCLUDES IN Class
const showClassIncludeTeachers = async (req, res) => {
    try {

        const teac = req.params.id;
        const classes = await classModel.find();
        if (!classes) { 
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }

        const result = classes.filter((items)=>{
            return items.teacherId == teac 
        });
             if (!result) { 
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }
        return res.status(200).json({
            success:true,
            message:"class is succes fully get",
            result
        })

    } catch (error) {
        console.log("show classes includ ace", error);
    }
}

// DISCONNECT IN Class
const disconnectMeeting = async (req, res) => {
    try {
        const id = req.params.id;
        if(!req.params.id){
            return res.status(500).json({
                success: false,
                message: "id has not passed"
            });
        }
        const result = await classModel.findByIdAndUpdate({_id:req.params.id},{joinRoom:false});
             if (!result) { 
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }
        return res.status(200).json({
            success:true,
            message:"meeting is disconnect",
            result
        })

    } catch (error) {
        console.log("show classes includ ace", error);
    }
}

// ACTIVE MEETING LINK IN Class
const activeMeeting = async (req, res) => {
    try {
        const id = req.params.id;
        if(!req.params.id){
            return res.status(500).json({
                success: false,
                message: "id has not passed"
            });
        }
        const result = await classModel.findByIdAndUpdate({_id:req.params.id},{joinRoom:true});
      if (!result) { 
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }
        return res.status(200).json({
            success:true,
            message:"meeting is connect",
            result
        })
    } catch (error) {
        console.log("show classes includ ace", error);
    }
}
module.exports = {
    createClass,
    deleteClass,
    getAllClass,
    editClass,
    updateClass,
    deletStudentFromClasses,
    AddStudentForClasses,
    showClassIncludeStudents,
    showClassIncludeTeachers,
    disconnectMeeting,
    activeMeeting
}