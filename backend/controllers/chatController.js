const chatModel = require("../models/chat");
const cloudniry = require("../cloudinary");
const saveChat = async (req, res) => {
  try {
    const { sender, message, classId, fileType } = req.body;

    let msgToSave = message;
    let typeToSave = fileType;

    // Agar ye message ek file ka Base64 string hai to Cloudinary me upload karega
    if (fileType !== "text" && message) {
      const uploadRes = await cloudniry.uploader.upload(message, {
        folder: "chatFiles",
        resource_type: "auto", // image/video/pdf sab handle
      });

      msgToSave = uploadRes.secure_url; // ab message me cloudinary url save hoga
    }

    // Save in DB
    const result = await chatModel.create({
      sender,
      message: msgToSave,
      fileType: typeToSave,
      classId,
    });

    res.status(200).json({
      success: true,
      message: "Message successfully sent",
      newMessage: result,
    });
    // res.status(201).json(newMessage);
  } catch (error) {
    console.log("save chat error", error);
  }
}


const getChat = async (req, res) => {
  const id = req.params.id;

  try {
    const messages = await chatModel.find({ classId: id }).populate('sender', 'name');

    if (!messages || messages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No messages found for this class."
      });
    }

    return res.status(200).json({
      success: true,
      message: "chat succcesfully delete",
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



const deleteChat = async (req, res) => {
  const id = req.params.id;

  try {
    console.log("hello")
    // const result = await chatModel.findById({_id:id});
    const message = await chatModel.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found."
      });
    }

    // If message has a file, delete it from Cloudinary
    if (message.fileType && message.fileType !== "text" && message.message) {
      try {
        // Extract public_id from Cloudinary URL
        const urlParts = message.message.split("/");
        const fileNameWithExt = urlParts[urlParts.length - 1]; // filename.ext
        const publicId = fileNameWithExt.split(".")[0]; // filename only

        await cloudniry.uploader.destroy(`chatFiles/${publicId}`, {
          resource_type: "auto"
        });
      } catch (err) {
        console.log("Error deleting file from Cloudinary:", err);
      }
    }

    // Delete the message from DB
    const result = await chatModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(200).json({
        success: false,
        message: "internal server error",
      });
    }
    return res.status(200).json({
      success: true,
      message: "chat succcesfully get",
      result
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
  getChat,
  deleteChat
}