const handleError = (err,req,res,next) => {

    res.status(err.statusCode).json({message : err.message})
}

module.exports = handleError