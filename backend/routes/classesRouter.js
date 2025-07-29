const express = require("express");
const { createClass, deleteClass, getAllClass, editClass, updateClass, deletStudentFromClasses, AddStudentForClasses, showClassIncludeStudents, showClassIncludeTeachers} = require("../controllers/classesController");
const authMiddleware = require("../middlewares/authMiddleware");
const classRoute =  express.Router();

// CREATE CLASSES
classRoute.post("/create", authMiddleware, createClass);

// DELETE CLASSES
classRoute.delete("/delete/:id", authMiddleware, deleteClass);

// GET ALL CLASSES
classRoute.get("/getAll", authMiddleware, getAllClass);

// EDIT CLASSES || GET 
classRoute.get("/edit/:id", authMiddleware, editClass);

// EDIT CLASSES
classRoute.post("/update", updateClass);

// DELETE STUDENT FROM CLASSES
classRoute.get("/delteStudentFromClass", authMiddleware,  deletStudentFromClasses);

// ADD STUDENT FROM CLASSES
classRoute.post("/addStudentForClass",  AddStudentForClasses);

// SHOW STUDENTS INCLUDES FROM CLASSES
classRoute.get("/showClassIncludeStudents/:id",  showClassIncludeStudents);

// SHOW Teachers INCLUDES FROM CLASSES
classRoute.get("/showClassIncludeTeachers/:id",  showClassIncludeTeachers);

module.exports = classRoute;