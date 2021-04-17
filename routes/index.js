import express, { Router } from "express";

//Import Local Files
import { httpStatus } from "../helpers";
import { StaffDetailsRouter } from "./staff_details";

const router = Router();

//User Imported Routers
router.use(StaffDetailsRouter);

// Bad Request
router.all("*", (req, res) => {
  res.status(httpStatus.Bad_Request).json({
    error: {
      code: httpStatus.Bad_Request,
      message: "Bad Request - Url not found",
    },
  });
});

export { router as routerV1 };
