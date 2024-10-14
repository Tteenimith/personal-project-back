// Import zone
const express = require("express")
const app = express()
const morgan = require('morgan')
const cors = require("cors")
require("dotenv").config()



const hldError = require("./middlewares/error")
const notFoundPage = require("./middlewares/not-found")

//Route
const auth = require("./routes/user-route")
const adminRoute = require("./routes/admin-route")

//middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())



app.use('/api',auth)
app.use("/api",adminRoute)




app.use(hldError)
app.use("*",notFoundPage)

const port = process.env.PORT || 8800
console.log(port);

app.listen(port,()=> console.log('Server running port',port))