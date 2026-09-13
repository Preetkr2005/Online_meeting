import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import "../CSS/Join_meeting.css"
import Navbar from "../Components/navbar"
import image from "../assets/join_meeting.png"
import axios from "axios"
import socket from '../socket'


function Join_meeting() {

  const [meetingCode, setMeetingCode] = useState("")
  const navigate = useNavigate()
  const username = localStorage.getItem("username")

  const handleJoinMeeting = async (e) => {

    e.preventDefault();

    const response = await axios.post("http://localhost:3000/api/Join_meeting",{
      meetingCode: meetingCode
    })

    if(response.data.status === "exists"){
      navigate(`/meeting/${meetingCode}`)
      socket.emit("join_meeting",username)
    }
    else{
      alert("meeting not exists")
    }

  }
  
  return (
    <>

    <Navbar></Navbar>

    <div className="join_meeting">

      <div id="meeting_id">
        <label htmlFor="meeting">Meeting ID</label>

        <div className="meeting_input">

          <input value={meetingCode} placeholder="enter meeting code" onChange={(e) => setMeetingCode(e.target.value)} id="meeting" type="text" />

          <button onClick={handleJoinMeeting}>Join</button>

        </div>
      </div>

      <div id="image">
        <img src={image} alt="Join meeting" />
      </div>

    </div>
    </>
  )
}

export default Join_meeting