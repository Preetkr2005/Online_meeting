import { useState } from "react"
import axios from "axios"
import "../CSS/Signup.css"
import { useNavigate } from "react-router-dom"

function SignupPage() {

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const response = await axios.post("http://localhost:3000/api/signup",{

      email: email,
      username: username,
      password: password

      })

      alert(response.data)
      navigate("/login")

    } catch(error){
      console.log("signup failed")
    }
  }
  return (
    <form>
      <div className="SignUp_Container">
        <h3>SignUp</h3>
        
        <input type="email" placeholder="email" 
        onChange={(e) => setEmail(e.target.value)}/>

        <input type="username" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>

        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>

        <button onClick={handleSubmit}>Signup</button>
    </div>
    </form>
  )
}
export default SignupPage