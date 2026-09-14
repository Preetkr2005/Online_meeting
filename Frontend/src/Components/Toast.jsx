import {useState} from "react"
import "../CSS/Toast.css"

function Toast({username}) {
  return (
    <div className="Toast">
        {username} Joined the meeting
    </div>
  )
}

export default Toast