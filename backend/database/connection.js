const mongoose = require("mongoose"); 

const connectionDb = async () => {
    try {
       await mongoose.connect(process.env.DB_URL);
        console.log("database connect succesfully")
    } catch (error) {
        console.log(error,"database connection error");
    }
} 

module.exports = connectionDb;