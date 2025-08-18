const express = require("express");
const { saveChat, getChat, deleteChat } = require("../controllers/chatController");
const chatRouter = express.Router();



chatRouter.post('/send', saveChat);

chatRouter.get('/all/:id', getChat) ;


chatRouter.delete('/deleteChat/:id', deleteChat) ;



module.exports = chatRouter;