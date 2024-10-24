const Joi = require("joi")
const createError = require("../utils/create-error")

const registerSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email is Required",
    }),
    password: Joi.string()
    .required()
    .pattern(/^[0-9a-zA-Z]{6,}$/)
    .messages({
    "string.empty": "Password is required!!",
    "string.pattern.base":
        "Password must contain a-z A-Z 0-9 and must be at least 6 character!!!",
    }),

});

const loginSchema = Joi.object({
    email : Joi.string().required().trim().email(),
    password: Joi.string().required()
})


const validateSchema = (schema) => (req,res,next)=>{

    const {value,error} = schema.validate(req.body)
    if (error) {
        return createError(400,error.details[0].message)
    }
    req.input = value
    next()
}


exports.registerValidate = validateSchema(registerSchema)
exports.loginValidate = validateSchema(loginSchema)