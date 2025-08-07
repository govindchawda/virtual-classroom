const chatModel = require("../models/chat");

const saveChat = async (req, res) => {
    try {
        console.log("hii");
        const { sender, message,classId } = req.body;
        const newMessage = await chatModel.create({ sender, message,classId });
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("save chat error", error);
    }
}


const getChat = async (req, res) => {
   const id  = req.params.id;
console.log("Class ID:", id);

try {
  const messages = await chatModel.find({ classId: id }).populate('sender', 'name');

  if (!messages || messages.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No messages found for this class."
    });
  }

  console.log("Messages:", messages);

  return res.status(200).json({
    success:true,
    message:"chat succcesfully get",
    result:messages
  });

} catch (error) {
  console.error("Error fetching messages:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
}

}


module.exports = {
    saveChat,
    getChat
}