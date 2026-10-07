import express from "express"
import CORS from "cors"
import connectDB from "./config/db.js"
import http from "http"
import {Server} from "socket.io"
import crypto from "crypto";
import { login, signup } from "./controllers/authControllers.js"
import Meeting from "./models/Meeting_schema.js"
import User from "./models/Schema.js"
import authenticateUser from "./middleware/authMiddleware.js"

const app = express()
const port = 3000
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

connectDB

app.use(CORS())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/api/login", login) 
app.post("/api/signup",signup)

app.post("/api/meeting", async (req,res) => {

  const {username} = req.body

  const MeetingID = crypto.randomBytes(4).toString("hex")

  const data = await User.findOne({username})

  const meeting = new Meeting({user_id: data._id, meetingCode: MeetingID});

  meeting.save()

  res.json({meetingID: MeetingID})

})

app.post("/api/Join_meeting", async (req,res) => {

  const {meetingCode} = req.body

  const data = await Meeting.findOne({meetingCode})

  try{

    if(!data){
      return res.json({status: "not exists"})
    }
    else{
      return res.json({status: "exists"})
    }

  }
  catch(error){
    res.json({error: error.message})
  }

})




// socket Io connection
io.on("connection", (socket) => {
  
  console.log("User connected: ", socket.id)

  socket.on("send_message", (data) => {

    const {meetingCode} = data

    io.to(meetingCode).emit("receive_message", data)

  })

  socket.on("join_meeting", ({username, meetingCode}) => {
    console.log(username, "joined the meeting")
    socket.join(meetingCode)

    // console.log(username, "joined room:", meetingCode);
    // console.log(io.sockets.adapter.rooms.get(meetingCode));

    socket.to(meetingCode).emit("user_joined", username)

  })

  socket.on("leave_meeting", ({username, meetingCode}) => {

    socket.leave(meetingCode)

    console.log(username, "left the meeting:", meetingCode)

    console.log(io.sockets.adapter.rooms.get(meetingCode));

    io.to(meetingCode).emit("user_left",username)

  })

})




server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




//   // User disconnect 
//   socket.on("disconnect", () => {

//     console.log("User disconnect:", socket.id)

//   })

// })