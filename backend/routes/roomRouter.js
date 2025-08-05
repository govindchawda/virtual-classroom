const express = require("express");
const { createRoom, getRoom, deleteRoom } = require("../controllers/roomController");
const roomRouter = express.Router();


// CREATE MEETING
roomRouter.post("/create",createRoom);

// CREATE MEETING
roomRouter.get("/get/:id",getRoom);

// dDELETET MEETING    
roomRouter.delete("/delete/:id",deleteRoom);

module.exports = roomRouter;