const prisma = require("../config/prisma")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const createError = require("../utils/create-error")


exports.register = async(req,res,next) =>{
    try {
        const {name , email , password , phone } = req.body

        // Validate req.body
        if (!email) {
            return createError(400,"Email are requirement")
            }
        if (!password){
            return createError(400,"Password are Requirement")
        }
        //Check Email
        const findEmail = await prisma.user.findUnique({
            where : {email:email}
        })
        if (findEmail) {
            return createError(400,"Email is already use")
        }

        // Encrypt password with bcryptjs
        const hashPassword = await bcrypt.hash(password,8)
        // Register success
        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                password:hashPassword,
                phone
            }
        })
        console.log(newUser)
        
        res.json({message : "Register success"})
    } catch (error) {
        next(error)
    }
}


exports.login = async(req,res,next) => {
    try {
        const {email,password} = req.body
        console.log(email,password)
        // validate
        if (!email){
            return createError(400,'email is required!')
        }
        if (!password) {
            return createError(400,"password is required")
        }
        //check DB
        const checkUser = await prisma.user.findUnique({where:{email:email}})
        if (!checkUser) {
            return createError(400,"email not invalid")
        }
        // // check pass
        const matchPass = await bcrypt.compare(password,checkUser.password)
        if (!matchPass) {
            return createError(400,"wrong pass")
        }
        // payload
        const payload = {
            user : {
                id:checkUser.id,
                email:checkUser.email,
                role:checkUser.role
            }
        }
        // token
        const genToken = jwt.sign(payload,process.env.SECRET,{
            expiresIn :"1d"
        })

        res.json({
            user:payload,
            token : genToken
        })
        // res.send("hello login")
    } catch (error) {
        next(error)
    }
}