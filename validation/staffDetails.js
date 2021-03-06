import { check } from "express-validator";
import staffDetails from "../routes/staff_details";

const validateStaffDetails = check("email").custom((email) => {
    if (alreadyHaveEmail(email)) {
        throw new Error("Email already registered");
    }
})
check(
    "password",
    "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
).matches("/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/", "i");
// check("contactNo").isMobilePhone(),
// check("firstName").isAlphanumeric().isLength({ min: 3 }),
// check("lastName").isAlphanumeric(),

export { validateStaffDetails };

// import Joi from "joi";
// // import Joi from "@hapi/joi"

// // create schema object
// const staffDetails = Joi.object().keys({
//     firstName: Joi.string().min(5).max(10).required(),
//     // lastName: joi.string().min(2).max(30).required(),
//     // email: joi.string().email().required(),
//     // password: joi.string().regex(/^[\w]{8,30}$/).required(),
//     // contactNo: joi.string().length(10).message('Invalid Contact Number'),
//     // address: joi.string(),
//     // city: joi.string(),
//     // zipCode: joi.string(),
// });

// const staffDetailsValidation = async(req, res, next) => {
//     console.log("i am here")
//     console.log(req.body, "body data")
//         // schema options
//     const options = {
//         abortEarly: false, // include all errors
//         allowUnknown: true, // ignore unknown props
//         stripUnknown: true, // remove unknown props
//     };
//     // validate request body against staff details
//     const { error } = staffDetails.validate(req.body, options);
//     if (error) {
//         // on fail return comma separated errors
//         res.json({
//             status: 400,
//             error: "Error",
//             Message: error.details
//                 .map((i) => {
//                     return JSON.stringify({
//                         message: i.message,
//                     })
//                 })
//                 .join(", "),
//         })
//     } else {
//         // on success replace req.body with validated value and trigger next middleware function
//         // req.body = value;
//         next();
//     }
// }

// export { staffDetailsValidation }