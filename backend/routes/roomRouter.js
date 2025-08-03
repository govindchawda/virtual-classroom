const express = require("express");
const { createRoom, getRoom } = require("../controllers/roomController");
const roomRouter = express.Router();


// CREATE MEETING
roomRouter.post("/create",createRoom);

// CREATE MEETING
roomRouter.get("/get/:id",getRoom);

// CREATE MEETING
roomRouter.delete("/delete",createRoom);

module.exports = roomRouter;