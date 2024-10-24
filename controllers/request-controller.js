const prisma = require("../config/prisma");
const createError = require("../utils/create-error")


exports.showRequest = async (req, res, next) => {
  try {
        const rs = await prisma.request.findMany({
            include:{
                user:true
            }
        })
        res.json(rs)
  } catch (err) {
    next(err);
  }
};

exports.newRequest = async (req, res, next) => {
  try {


    const { serialNumber, location, requestDate, delivery } = req.body;
    console.log(serialNumber, location, requestDate, delivery)
    console.log(req.user)
        // Find the part based on serial number
        const part = await prisma.part.findFirst({
            where: { id:+serialNumber }, // Looks for part with serialNumber
          });
        console.log("first",part)
        if (!part) {
            createError(404,"part not found")
        }
     
        console.log("sec")
          
    // Create the new request
    const rs = await prisma.request.create({
        data: {
        location: location,
        date: new Date(requestDate), // Assuming the field is 'date' in your schema
        delivery: delivery,
        userId: req.user.user.id,
        requestItems: {
            create: {
            partId: part.id, // Use the part ID found from serialNumber
            },
        },
        },
    });

    res.json(rs);
  } catch (err) {
    console.log(err)
    next(err);
  }
};


exports.updateReqStatus = async(req,res,next)=>{
  try {
    const {id} = req.params
    const rs = await prisma.request.updateMany({
      where:{id:Number(id)},
      data:req.body
    })

    res.json("update success")
  } catch (err) {
      next(err)
  }
}

exports.deleteRequest = async(req,res,next) =>{
  try {
      const {id} = req.params
      const rs = await prisma.request.delete({
        where:{
          id:Number(id)
        }
      })
      res.json(rs)
  } catch (err) {
    next(err)
  }
}