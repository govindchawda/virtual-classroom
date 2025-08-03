const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors")
const connectionDb = require('./database/connection');
const userroute = require("./routes/userRouter");
const classRoute = require("./routes/classesRouter");
const attendanceRouter = require("./routes/atttendanceRouter");
const roomRouter = require("./routes/roomRouter");

app.get('/home',(req,res)=>{
    res.send("home")
});

dotenv.config();
const port = process.env.PORT || 4000;
connectionDb();
 
app.use(cors());      

const allowedOrigins = [
  'http://localhost:5173',
  'https://virtual-classroom-frontend.onrender.com'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// app.use(cors({ origin: "https://virtual-classroom-frontend.onrender.com" }));
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth/',userroute);
app.use('/api/classes/',classRoute);
app.use('/api/attendannce/',attendanceRouter);
app.use('/api/googleMeeting/',roomRouter);

app.listen(port , ()=>{
    console.log(`app is running http://localhost:${port}`);
});





// const express = require("express");
// const app = express();

// const http = require("http");
// const server = http.createServer(app); // ✅ Use HTTP for Socket.IO

// const dotenv = require("dotenv");
// const cors = require("cors");

// const connectionDb = require('./database/connection');
// const userroute = require("./routes/userRouter");
// const classRoute = require("./routes/classesRouter");
// const attendanceRouter = require("./routes/atttendanceRouter");
// const roomRouter = require("./routes/roomRouter");

// // ✅ Setup Socket.IO
// const { Server } = require("socket.io");
// const socketHandler = require("./sockets/roomSocket"); // We'll create this file

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// dotenv.config();
// const port = process.env.PORT || 4000;
// connectionDb();

// app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// app.get('/home', (req, res) => {
//     res.send("home");
// });

// app.use('/api/auth/', userroute);
// app.use('/api/classes/', classRoute);
// app.use('/api/attendannce/', attendanceRouter);
// app.use('/api/googleMeeting/', roomRouter);

// // ✅ Start socket handler
// socketHandler(io);

// // ✅ Start HTTP server, not app.listen!
// server.listen(port, () => {
//     console.log(`App is running at http://localhost:${port}`);
// });
