const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors")
const connectionDb = require('./database/connection');
const userroute = require("./routes/userRouter");
const classRoute = require("./routes/classesRouter");
const attendanceRouter = require("./routes/atttendanceRouter");

app.get('/home',(req,res)=>{
    res.send("home")
});

dotenv.config();
const port = process.env.PORT || 4000;
connectionDb();
 
app.use(cors());        
// app.use(cors({ origin: "https://virtual-classroom-frontend.onrender.com" }));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth/',userroute);
app.use('/api/classes/',classRoute);
app.use('/api/attendannce/',attendanceRouter);

app.listen(port , ()=>{
    console.log(`app is running http://localhost:${port}`);
});