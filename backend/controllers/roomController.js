const roomModel = require("../models/room");

// CREATE MEETING
const createRoom = async (req,res) => {
    try {
        const {meetingLink,classId} = req.body;
        if(!meetingLink || !classId){
         return res.status(400).json({
                success: false,
                message: ' require fields'
            });
        }
        console.log("meetingLink,classId",meetingLink,classId)
        const result = await roomModel.create({meetingLink,classId});
       if (!result) {
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }
        console.log("hii");
        return res.status(202).json({
            success: true,
            message: "meeting is successfully created",
            result
        });
    } catch (error) {
        console.log(error,"create meeting classs error");
    }
}
const getRoom = async (req,res) => {
    try {
        const {id} = req.params.id;
        console.log("id",id)
         if(!id){
         return res.status(400).json({
                success: false,
                message: 'require fields'
            });
        }
        // console.log("meetingLink,classId",meetingLink,classId)
        const result = await roomModel.find();
       if (!result) {
            return res.status(500).json({
                success: false,
                message: "internal server error"
            });
        }
        console.log("hii");
        return res.status(202).json({
            success: true,
            message: "meeting is successfully created",
            // result
        });
    } catch (error) {
        console.log(error,"create meeting classs error");
    }
}


module.exports = {
    createRoom,
    getRoom
}
