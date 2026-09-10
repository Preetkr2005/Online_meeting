import jwt from "jsonwebtoken"
import User from "../models/Schema.js"
import bcrypt from "bcrypt"

// LOGIN LOGIC

const login = async (req,res) => {

    const {username, password} = req.body;
    
    const data = await User.findOne({username})
    
    try {
    
        let {username, password} = req.body
    
        let isPassword = await bcrypt.compare(password, data.password)
    
        if(data.username == username && isPassword){
    
          const token = jwt.sign(
            {userId: data._id},
            "mysecretkey"
          )
          
          res.status(200).json({
            message: "login successfully",
            token,
            username: data.username
          })
    
    
        }
    else{
          res.send("Invaild credentials")
        }
    } catch {
        res.send("Invaild credentials")
    }
}


// SIGNUP LOGIC

const signup = async (req,res) => {

    
    const {email, username, password} = req.body
    
    const hashedpassword = await bcrypt.hash(password,10)
    
    const user = new User({
        email,
        username,
        password: hashedpassword,
    })
    
    user.save()
    
    res.send("signup successfully")

}

export {login, signup};
