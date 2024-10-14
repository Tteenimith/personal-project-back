const express = require("express")
const router = express.Router()
const { listMember } = require("../controllers/menber")
const {register} = require("../controllers/admin-auth")


router.get("/member",listMember)


module.exports = router