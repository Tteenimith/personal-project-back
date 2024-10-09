const notFoundPage = (req,res) => {
    res.status(404).json({message :"Page not Found"})
}

module.exports = notFoundPage