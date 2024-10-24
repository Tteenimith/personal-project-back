const prisma = require("../config/prisma")

exports.getModel = async(req,res)=>{
    try {
        const rs = await prisma.model.findMany({
           include:{
            parts:true
           }
        })
        res.json(rs)
    } catch (err) {
        next(err)
    }
}

exports.createModel = async(req,res,next) =>{
    try {
        const {name} = req.body
        const rs = await prisma.model.create({
            data:{
                name,
            }
        }) 
        console.log(rs)
        res.json(rs)
    } catch (err) {
        next(err)
    }
}


exports.updateModel = async(req,res,next)=>{
    try {
        const {id} = req.params
        console.log("id",id)
        const rs = await prisma.model.update({
            where:{
                id:Number(id)
            },
            data:req.body
        })
        res.json("update success")
    } catch (err) {
        console.log(err)
        next(err)
    }
}


exports.deleteModel = async(req,res,next) =>{
    try {
        const {id} = req.params
        const rs = await prisma.model.delete({
            where:{
                id:Number(id)
                }
        })
        res.json(rs)
    } catch (err) {
        next(err)
    }
}