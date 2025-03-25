import { Job } from "../2models/2job.model.js";
// admin post krega job
/*
**********************
 postJob Starting
**********************
*/
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    // Validation to ensure required fields are provided
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    // Creating a new job
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary,
      experienceLevel: experience,
      location,
      jobType,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "Job posted successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

/*
**********************
 postJob Ending
**********************
*/

/*
**********************
 getAllJobs Starting
**********************
*/

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || ""; // Get search keyword from query
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
**********************
 getAllJobs Ending
**********************
*/

/*
**********************
 getJobById Starting
**********************
*/
export const getJobById = async (req, res) => { // we get job's id  
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

/*
**********************
 getJobById Ending
**********************
*/

/*
**********************
 getAdminJobs Starting
**********************
*/
export const getAdminJobs = async (req, res) => {// get the admin's jobs
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      options: { sort: { createdAt: -1 } },
    });

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found for this admin.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

/*
**********************
 getAdminJobs Ending
**********************
*/

export const applyForJob = async (req, res) => {
  const { jobId } = req.params;
  const userId = req.id;    // Use user ID from the authentication middleware (from token)

  try {
    const job = await Job.findById(jobId);  // Find the job
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }    
    const alreadyApplied = job.applications.some(  // Check if user has already applied
      (app) => app.applicant.toString() === userId
    );
    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied to this job.",
        success: false,
      });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Add application to job
    job.applications.push(application._id);
    await job.save();

    return res.status(200).json({
      message: "Successfully applied to the job.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while applying for the job.",
      success: false,
    });
  }
};
