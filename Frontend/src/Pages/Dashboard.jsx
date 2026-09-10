import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/navbar'
import "../CSS/Dashboard.css"
import axios from 'axios'

function Dashboard() {

  const navigate = useNavigate()

  const username = localStorage.getItem("username")
 
  const joinMeeting = async () => {

    navigate("/Join_meeting")

  }

  const newMeeting = async () => {

    let response = await axios.post("http://localhost:3000/api/meeting", 
      {

        username: username

    })

    const meetingCode = response.data.meetingID

    navigate(`/meeting/${meetingCode}`)

  }
 
  return (
    <>
      <Navbar />

      <div className="content">

        <div className="left_content">
          <h3>Good morning, Preet</h3>

          <div className="meeting">
            <div onClick={newMeeting} id="new_meeting">New Meeting</div>
            <div onClick={joinMeeting} id="Join_meeting">Join Meeting</div>
          </div>
        </div>

        <div className="meeting_card">
          <h4>UPCOMING MEETINGS</h4>
          <p>No Meeting scheduled</p>
        </div>

      </div>
    </>
  )
}

export default Dashboard