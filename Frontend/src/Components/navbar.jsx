import "../CSS/navbar.css"
import { useState } from "react"

function Navbar() {
  
  const [username, setusername] = useState(
    localStorage.getItem("username")
  
  )

  const handlelogout = () => {
    localStorage.removeItem("username")
    localStorage.removeItem("token")

    setusername(null)
  }

  return (

    <header className="header">
      <a href="/dashboard" className="logo">Logo</a>

      <nav className="navbar">
        {username ? (
          <>
          <span id="username">{username}</span>
          <button id="logout" onClick={handlelogout}>logout</button>
          </>
        ) : (
          <>
          <a href="/signup">SignUp</a>
          <a href="/login">Login</a>
          </>
        )}

      </nav>

    </header>

  )
}

export default Navbar