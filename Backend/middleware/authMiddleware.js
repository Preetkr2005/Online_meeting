import jwt from "jsonwebtoken"

const authenticateUser = (req,res,next) => {

    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.json({
            message: "no token provided"
        })
    }

    const token = authHeader.split(" ")[1]

    try{

        const decoded = jwt.verify(token, "mysecretkey");

        req.userId = decoded.userId

        next()

    }

    catch(error){

        return res.json({
            message: "invalid or expire token"
        })

    }

}

export default authenticateUser