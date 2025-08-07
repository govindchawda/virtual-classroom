const express = require("express");
const { saveChat, getChat } = require("../controllers/chatController");
const chatRouter = express.Router();



chatRouter.post('/send', saveChat);

chatRouter.get('/all/:id', getChat) ;



module.exports = chatRouter;