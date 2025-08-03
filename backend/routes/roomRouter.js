const express = require("express");
const { createRoom } = require("../controllers/roomController");
const roomRouter = express.Router();


// CREATE MEETING
roomRouter.post("/create",createRoom);

module.exports = roomRouter;