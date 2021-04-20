import express, { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

//Import Local Files
import { httpStatus } from "../helpers";
import { Staffdetails } from "../handlers";
import { check, validationResult } from "express-validator";
// import { staffDetailsValidation } from "../validation/staffDetails"

const StaffDetailsRouter = Router();

//Applying Multer File and setup multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = `public/uploads/staff/profile`;
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const datetimestamp = Date.now();
        const originalfilename = `${file.fieldname}-${datetimestamp}${path.extname(
      file.originalname
    )}`;
        cb(null, originalfilename);
    },
});

const profilefilter = (req, file, cb) => {
    if (
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg"
    ) {
        return cb(null, true);
    } else {
        return cb(new Error("Only image file is allowed!"), false);
    }
};

const uploadFile = multer({ storage: storage, fileFilter: profilefilter });
const singleProfile = uploadFile.single("profile");

// Create a new Staff
StaffDetailsRouter.post(
    "/staffdetails",
    check("email").isEmail().withMessage("Invalid Email Address"),
    check("password").trim()
    .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
    })
    .withMessage(
        "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    ),
    check("contactNo").isMobilePhone(),
    check("firstName").isAlphanumeric().isLength({ min: 3 }),
    check("lastName").isAlphanumeric(), (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        singleProfile(req, res, (err) => {
            if (err) {
                console.log(err.message);
                return res.status(400).json({ message: err.message });
            }
            const file = req.file;
            let path;
            if (file) {
                path = req.file.destination + "/" + req.file.filename;
            }
            Staffdetails.createStaff({...req.body, profileImage: path })
                .then((data) => {
                    res.status(httpStatus.Created).json(data);
                })
                .catch((err) => {
                    res.status(httpStatus.Bad_Request).json({
                        code: httpStatus.Bad_Request,
                        error: err,
                    });
                });
        });
    }
);

// Retrieve all Staff
StaffDetailsRouter.get("/staffdetails", (req, res) => {
    Staffdetails.getStaff(req)
        .then((data) => {
            if (!data.length) {
                res
                    .status(httpStatus.No_Content)
                    .json({ Message: "Staff Data Not Found" });
            } else {
                res.status(httpStatus.OK).json({ Data: data });
            }
        })
        .catch((err) => {
            res.status(httpStatus.Bad_Request).json({
                code: httpStatus.Bad_Request,
                error: err,
            });
        });
});

//Retrieve a single staff with id
StaffDetailsRouter.get("/staffdetails/:id", (req, res) => {
    Staffdetails.getStaffById(req.params.id)
        .then((data) => {
            if (!data || data == null) {
                res.status(httpStatus.No_Content).json({ Message: "Data Not Found" });
            } else {
                res.status(httpStatus.OK).json({ Data: data });
            }
        })
        .catch((err) => {
            res.status(httpStatus.Bad_Request).json({
                code: httpStatus.Bad_Request,
                error: err,
            });
        });
});

// Update a Staff with id
StaffDetailsRouter.put("/staffdetails/:id", (req, res) => {
    singleProfile(req, res, (err) => {
        if (err) {
            console.log(err.message);
            return res.status(400).json({ message: err.message });
        }
        const file = req.file;
        let path;
        if (file) {
            path = req.file.destination + "/" + req.file.filename;
        }
        // Staffdetails.updateStaffById({...req.body, id: req.params.id, profileImage: path })
        Staffdetails.updateStaffById({...req.body, profileImage: path }, { id: req.params.id })
            .then((data) => {
                res.status(httpStatus.OK).json({ data });
            })
            .catch((err) => {
                res.status(httpStatus.Bad_Request).json({
                    code: httpStatus.Bad_Request,
                    error: err,
                });
            });
    });
});

// Delete a Staff with id
StaffDetailsRouter.delete("/staffdetails/:id", (req, res) => {
    Staffdetails.deleteStaffById(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(httpStatus.No_Content).json({ Message: "Data Not Found." });
            } else {
                res.status(httpStatus.OK).json({ Data: data });
            }
        })
        .catch((err) => {
            res.status(httpStatus.Bad_Request).json({
                code: httpStatus.Bad_Request,
                error: err,
            });
        });
});

export { StaffDetailsRouter };