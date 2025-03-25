import express from 'express';
import isAuthenticated from '../2middlewares/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, postJob, applyForJob } from '../2controllers/job.controller.js';

const router = express.Router();

// Route to get jobs posted by the admin
router.route('/getadminjobs').get(isAuthenticated, getAdminJobs); // Ensure this is correct

// Other routes
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
 router.route("/getAdminJobs").post(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.route("/apply/:jobId").post(isAuthenticated, applyForJob);

export default router;
