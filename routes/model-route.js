const express = require("express")
const router = express.Router()
const {getModel,createModel,updateModel,deleteModel} = require("../controllers/model-controller")

// model route
router.get("/getModel",getModel)
router.post("/createModel",createModel)
router.patch("/updateModel/:id",updateModel)
router.delete("/deleteModel/:id",deleteModel)


module.exports = router