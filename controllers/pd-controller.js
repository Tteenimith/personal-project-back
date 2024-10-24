const createError = require("../utils/create-error")
const prisma = require("../config/prisma")
const fs = require("fs/promises")
const cloud = require("../config/cloud")
const path = require("path")



exports.getPart = async(req,res,next) =>{
    try {
            const parts = await prisma.part.findMany({
                // select:{
                   
                //     id:true,
                //     name:true,
                //     sr_number:true,
                //     image:true,
                //     modelId :true,
                    
                // }
                include:{
                    model:true
                }
            })
            // const model = await prisma.model.findMany({})

            res.json({parts})
    } catch (err) {
        next(err)
    }
}


exports.createPart = async(req,res,next)=>{
    try {
        const {image,name,srNumber,model} = req.body
        const imageFile = !!req.file
        let uploadRs = {}
        if (imageFile) {
            uploadRs = await cloud.uploader.upload(req.file.path,{
                overwrite : true,
                public_id : path.parse(req.file.path).name,
            }),fs.unlink(req.file.path)
        }
        const data = {
            image : uploadRs.secure_url || "" ,
            name : name,
            sr_number : srNumber,
            modelId : +model
        }
        console.log(data,"data")
        const rs = await prisma.part.create({data})
        res.json(rs)
    } catch (err) {
        console.log(err)
        next(err)
    }
}



exports.updatePart = async(req,res,next)=>{
    try {
        const {id} = req.params
        console.log("id",id)
        const parts = await prisma.part.update({
            where:{
                id:Number(id)
            },
            data:req.body
        })
            res.json("Update Success")
    } catch (err) {
        console.log(err)
        next(err)
    }
}


exports.deletePart = async(req,res,next)=>{
    try {
            const {id} = req.params
            const parts = await prisma.part.delete({
                where:{
                    id:Number(id)
                }
            })
            res.json(parts)
    } catch (err) {
        next(err)
    }
}