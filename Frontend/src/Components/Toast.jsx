import {useState} from "react"
import "../CSS/Toast.css"

function Toast({username, message}) {
  return (
    <div className="Toast">
        {username} {message}
    </div>
  )
}

export default Toast