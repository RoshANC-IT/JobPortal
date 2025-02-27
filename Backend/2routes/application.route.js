
// import express from "express";
// import isAuthenticated from "../2middlewares/isAuthenticated.js";
// import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../2controllers/application.controller.js";
 
// const router = express.Router();

// router.route("/apply/:id").get(isAuthenticated, applyJob);
// router.route("/get").get(isAuthenticated, getAppliedJobs);
// router.route("/:id/applicants").get(isAuthenticated, getApplicants);
// router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

// export default router;

import express from "express";
import isAuthenticated from "../2middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../2controllers/application.controller.js";

const router = express.Router();

// Apply for a job (use POST since you're creating an application)
router.route("/apply/:id").post(isAuthenticated, applyJob);

// Get applied jobs for the user
router.route("/get").get(isAuthenticated, getAppliedJobs);

// Get applicants for a job (GET all applicants for a specific job)
router.route("/:id/applicants").get(isAuthenticated, getApplicants);

// Update application status (POST request)
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;
