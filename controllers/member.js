const prisma = require("../config/prisma")

exports.listMember = async (req,res) => {
    try {
        const member = await prisma.user.findMany({
            select:{
                id:true,
                name:true,
                email:true,
                role:true,
                branch:true
            }
        })
        res.json(member)

    } catch (err) {
        console.log(err)
    }
}

exports.updateMember = async(req,res,next) =>{
    try {
        const {id} = req.params
        // const {role,branch} = req.body
        console.log(req.body)
        const member = await prisma.user.update({
            where:{
                id:Number(id)
            },
            data:req.body
        })

        res.json("Update Success")
    } catch (err) {
        next(err)
    }
}

exports.deleteMember = async(req,res,next) =>{
    try {
        const {id} = req.params
        const member = await prisma.user.delete({
            where:{
                id:Number(id)
            }
        })
        
        res.json({message:"Delete Success"})
    } catch (err) {
        console.log(err);
        next(err)
    }
}