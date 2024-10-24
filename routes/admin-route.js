const express = require("express")
const router = express.Router()
const { listMember,updateMember,deleteMember } = require("../controllers/member")
const {register} = require("../controllers/admin-auth")
const {createPart,getPart,updatePart,deletePart} = require("../controllers/pd-controller")
const upload = require("../middlewares/upload")


// middleware
const {auth} = require("../middlewares/auth")



router.post("/register",register)
// user route
router.get("/member",listMember)
router.patch("/member/:id",auth,updateMember)
router.delete("/member/:id",auth,deleteMember)

// part route
router.get("/part",getPart)
router.post("/part",auth,upload.single("image"),createPart)
router.patch("/part/:id",auth,updatePart)
router.delete("/part/:id",auth,deletePart)


module.exports = router