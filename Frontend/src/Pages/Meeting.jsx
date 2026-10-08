import { useParams, useNavigate } from "react-router-dom"
import "../CSS/meeting.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faMicrophoneLines,faWindowRestore, faMessage, faSquarePhone, faX, faMicrophoneLinesSlash, faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from "react"
import socket from "../socket"
import Toast from "../Components/toast"

function Meeting() {  

  const { meetingCode } = useParams()
  const username = localStorage.getItem("username")
  const navigate = useNavigate()
  const videoref = useRef(null)
  const streamRef = useRef(null)


  const [state, setState] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")

  const [showToast, setshowToast] = useState(false)
  const [toastUsername, setToastUsername] = useState("")
  const [toastMessage, setToastMessage] = useState("")

  const [Mic, setMic] = useState(true)
  const [Camera, setCamera] = useState(true)

  const data = {
    username: username,
    message: inputMessage
  }

  // this is user_joined
  useEffect(() => {

  const handleUserJoined = (username) => {

    setToastUsername(username)
    setToastMessage("joined meeting")
    setshowToast(true)

    setTimeout(() => {
      setshowToast(false)
    }, 2000)
  }
    
  const handleReceiveMessage = (data) => {
    setMessages((messages) => {
      return [...messages, data]
    })
  };

  socket.on("user_joined",handleUserJoined)
  socket.on("receive_message", handleReceiveMessage);

  socket.emit("join_meeting", {
    username,
    meetingCode
  })

  return () => {
    socket.off("receive_message", handleReceiveMessage);
    socket.off("user_joined", handleUserJoined)
  };

  }, [meetingCode, username])


  //this is for user_left
  useEffect(() => {

    const handleUserLeft = (username) => {
      console.log(username, "left the meeting")

      setToastUsername(username)
      setToastMessage("left meeting")
      setshowToast(true)
      setTimeout(() => {
        setshowToast(false)
      }, 2000)

    }

    socket.on("user_left", handleUserLeft)

    return () => {
      socket.off("user_left", handleUserLeft)
    }

  }, [])

  // Creating a local video preview
  useEffect(() => {

    const getCamera = async () => {

      const stream = await navigator.mediaDevices.getUserMedia({

        video: true

      })

      streamRef.current = stream;

      videoref.current.srcObject = stream;

    };
    
    getCamera()


  }, [])

  const handleMessage = () => {

    socket.emit("send_message", {...data, meetingCode})

  }


  const handlechat = () => {

    setState(!state)

  }

  const handleclose = () => {

    setState(false)

  }

  const LeaveRoom = () => {

    socket.emit("leave_meeting", {
      username,
      meetingCode
    });

    navigate("/dashboard")

  }

  const handleMic = () => {
    setMic(!Mic)
  }

  const handleCamera = () => {
    const stream = streamRef.current

    if(!stream) return

    const videoTrack = stream.getVideoTracks()[0]

    videoTrack.enabled = !videoTrack.enabled;

    setCamera(videoTrack.enabled);

   }


  return (
    <div className="meeting_container">
      <div className="meeting_main">
      <div className="meeting_details">
        <h1>Meeting Room</h1>
        <p>Meeting ID: {meetingCode}</p>
      </div>

        {showToast && <Toast username={toastUsername} message={toastMessage}/>}

      <div className="video">
        <div id="video1">
          <video ref={videoref} autoPlay playsInline/>
        </div>
        <div id="video2">
          video appear here
        </div>
      </div>

      <div className="buttons">

        {Mic ? <FontAwesomeIcon id="mic" onClick={handleMic} icon={faMicrophoneLines} /> : <FontAwesomeIcon id="mic" onClick={handleMic} icon={faMicrophoneLinesSlash} />}

        {Camera ? <FontAwesomeIcon id="video" onClick={handleCamera} icon={faVideo} /> : <FontAwesomeIcon id="video" onClick={handleCamera} icon={faVideoSlash} />}

        <FontAwesomeIcon id="screen-share" icon={faWindowRestore} />

        <FontAwesomeIcon onClick={handlechat} id="chat" icon={faMessage} />

        <FontAwesomeIcon onClick={LeaveRoom} id="end" icon={faSquarePhone} />
      </div>
      </div>

    {state && (

        <div className="chat_panel">
        <h1>Chat</h1>

        <FontAwesomeIcon onClick={handleclose} className="close_icon" icon={faX} />

        <div className="chat_message">
          {messages.length > 0 && (
              messages.map(function(data, index){
                return(
                  <div className={
                    data.username === username
                    ?"message_sent"
                    :"message_received"
                  } key={index}>
                    <span>{data.username}</span>
                    <p id="message">{data.message}</p>
                  </div>
                )
              })
          )}
        </div>

        <div className="chat_input">
          <input onChange={(e) => setInputMessage(e.target.value)} placeholder="type message" type="text" />
          <button onClick={handleMessage} >send</button>
        </div>

      </div>

    )}

    </div>
  )
}

export default Meeting