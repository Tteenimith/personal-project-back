const prisma = require("../config/prisma")

exports.listMember = async (req,res) => {
    try {
        const member = await prisma.user.findMany({
            select:{
                id:true,
                email:true,
                role:true
            }
        })
        res.json(member)

    } catch (err) {
        console.log(err)
    }
}