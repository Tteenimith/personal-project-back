const jwt = require("jsonwebtoken")
const createError = require("../utils/create-error")

exports.auth = (req,res,next)=>{
    try {
        //check head
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return createError(401,"token missing")
        }
        const token = authHeader.split(" ")[1]

        console.log(authHeader)
        
        //Decode
        jwt.verify(token,process.env.SECRET,(err,decode)=>{
            if(err){
                    return createError (400,"token invalid")
                }
                req.user = decode
                console.log(req.user)
                next()
            })


    } catch (err) {
        next(err)
    }
}