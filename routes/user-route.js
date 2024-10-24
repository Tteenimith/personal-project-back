const express = require("express")
const router = express.Router()
const {register,login,currentUser} = require("../controllers/admin-auth")
const {registerValidate,loginValidate} = require("../middlewares/validatior")
const {showRequest,newRequest,updateReqStatus,deleteRequest} = require("../controllers/request-controller")
const {auth} = require("../middlewares/auth")


router.post("/login",loginValidate,login)


// request 
router.post('/request',auth,newRequest)
router.get("/request",showRequest)
router.patch("/request/:id",updateReqStatus)
router.delete("/request/:id",deleteRequest)


//@ACCESS Private
router.post("/current-user",auth,currentUser)

module.exports = router