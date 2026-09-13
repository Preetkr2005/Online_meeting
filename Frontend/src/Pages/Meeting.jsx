import { useParams } from "react-router-dom"
import "../CSS/meeting.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faMicrophoneLines,faWindowRestore, faMessage, faSquarePhone, faX } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"
import socket from "../socket"

function Meeting() {  

  const { meetingCode } = useParams()
  const username = localStorage.getItem("username")


  const [state, setState] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")

    const data = {
    username: username,
    message: inputMessage
  }

  useEffect(() => {

  const handleUserJoined = (username) => {
    alert(username + " joined the meeting")
  }

  socket.on("user_joined",handleUserJoined)
    
  const handleReceiveMessage = (data) => {
    setMessages((messages) => {
      return [...messages, data]
    })
  };

  socket.on("receive_message", handleReceiveMessage);

  return () => {
    socket.off("receive_message", handleReceiveMessage);
  };

  }, [])

  const handleMessage = () => {

    socket.emit("send_message", data)

  }


  const handlechat = () => {

    setState(true)

  }

  const handleclose = () => {

    setState(false)

  }


  return (
    <div className="meeting_container">
      <div className="meeting_main">
      <div className="meeting_details">
        <h1>Meeting Room</h1>
        <p>Meeting ID: {meetingCode}</p>
      </div>

      <div className="video">
        <div id="video1">
          video appear here!
        </div>
        <div id="video2">
          video appear here
        </div>
      </div>

      <div className="buttons">
        <FontAwesomeIcon id="mic" icon={faMicrophoneLines} />
        <FontAwesomeIcon id="video" icon={faVideo} />
        <FontAwesomeIcon id="screen-share" icon={faWindowRestore} />
        <FontAwesomeIcon onClick={handlechat} id="chat" icon={faMessage} />
        <FontAwesomeIcon id="end" icon={faSquarePhone} />
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
                  <div className="message_sent" key={index}>
                    <span>{data.username}</span>
                    <p id="message">{data.message}</p>
                  </div>
                )
              })
          )}

          {/* <div className="message_received">
            <p>hello!</p>
          </div> */}

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