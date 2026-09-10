import { useState } from 'react'
import axios from "axios"
import "../CSS/Login.css"
import { useNavigate } from 'react-router-dom'

function LoginPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();

      try{

        const response = await axios.post("http://localhost:3000/api/login",
          {
            username: username,
            password: password
        })

        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", response.data.username)

        alert(response.data.message)

        console.log("token and username stored successfully")

        navigate("/dashboard")

      }catch(error){
        console.log("login denied")
        console.log(error)
      }

    }


  return (
    <form>
    <div className="Login_Container">
        <h3>Login</h3>

        <input type="username" value={username} placeholder="username"
        onChange={(e) => setUsername(e.target.value)} />

        <input type="password" value={password}placeholder="password"
        onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" onClick={handleSubmit}>Login</button>
    </div>
    </form>
  )
}

export default LoginPage