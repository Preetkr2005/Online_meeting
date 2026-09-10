import {Routes, Route} from "react-router-dom"
import Dashboard from "./Pages/Dashboard";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login"
import Join_meeting from './Pages/Join_meeting';
import ProtectedRoute from "./Components/ProtectedRoute";
import Meeting from "./Pages/Meeting";

function App() {
  return (

    <Routes>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      
      <Route path="/dashboard" element=
      {<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      
      <Route path="/Join_meeting" element={<ProtectedRoute><Join_meeting/></ProtectedRoute>}></Route>

      <Route path="/meeting/:meetingCode" element={<ProtectedRoute><Meeting/></ProtectedRoute>}></Route>
      
    </Routes>

  )
}

export default App
