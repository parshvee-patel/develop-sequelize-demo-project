import express, { Router } from'express'
import { httpStatus } from "../helpers"
import { Staffdetails } from '../handlers'

const StaffDetailsRouter = Router()

// Create a new Staff
StaffDetailsRouter.post("/staffdetails",(req,res) => {
    Staffdetails.createStaff(req).then((data) => {
        res.status(httpStatus.OK).json({"Message": "Staff Details Created Successfully"})
    }).catch((err) => {
        res.status(httpStatus.Bad_Request).json({
            code: httpStatus.Bad_Request,
            error: err,
        })
    })
    
})

// Retrieve all Staff
StaffDetailsRouter.get("/staffdetails",(req,res) => {
     res.status(httpStatus.OK).json({"Message": "Get All Staff Details"})
})

//Retrieve a single staff with id
StaffDetailsRouter.get("/staffdetails/:id",(req,res) => {
     res.status(httpStatus.OK).json({"Message": "Get Staff Details by Id"})
})

// Update a Staff with id
StaffDetailsRouter.put("/staffdetails/:id",(req,res) => {
     res.status(httpStatus.OK).json({"Message": "Staff Details Updated Successfully"})
})

// Delete a Staff with id
StaffDetailsRouter.delete("/staffdetails/:id",(req,res) => {
     res.status(httpStatus.OK).json({"Message": "Staff Details Delete Successfully"})
})

export { StaffDetailsRouter}