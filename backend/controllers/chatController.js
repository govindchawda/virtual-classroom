const chatModel = require("../models/chat");
const cloudniry = require("../cloudinary");
const saveChat = async (req, res) => {
  try {
    console.log("hii");
    const { sender, message, classId, fileUrl, fileType } = req.body;
    // file => base64 string (agar aap FileReader use kar rahe ho frontend me)
    // fileType => mimetype (image/png, video/mp4, application/pdf)

    let newfileUrl = null;

    // Agar file bheja gaya hai to Cloudinary me upload karo
    if (fileUrl) {
      const uploadRes = await cloudniry.uploader.upload(fileUrl, {
        folder: "chatFiles",
        resource_type: "auto", // image / video / pdf sab handle karega
      });
      newfileUrl = uploadRes.secure_url;
    }

    // Save message in DB
    const result = await chatModel.create({
      sender,
      message,
      classId,
      fileUrl:newfileUrl,
      fileType,
    });

    if (!result) {
      return res.status(202).json({
        success: true,
        message: "message not send "
      });
    }
    return res.status(200).json({
      success: true,
      message: "message succesfuly send",
      newMessage: result
    });
    // res.status(201).json(newMessage);
  } catch (error) {
    console.log("save chat error", error);
  }
}


const getChat = async (req, res) => {
  const id = req.params.id;
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
      success: true,
      message: "chat succcesfully get",
      result: messages
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