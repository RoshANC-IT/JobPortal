import { Application } from "../2models/2application.model.js"; 
import { Job } from "../2models/2job.model.js";

/*
**********************
 applyJob Starting
**********************
*/
export const applyJob = async (req, res) => {
    try {
      // Get the user ID and job ID from the request
      const userId = req.id;  // This assumes you're setting the user ID in req.id after authentication
      const jobId = req.params.id;  // Job ID from the URL parameter
  
      if (!jobId) {
        return res.status(400).json({
          message: "Job id is required.",
          success: false,
        });
      }
  
      // Check if the user has already applied for this job
      const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
  
      if (existingApplication) {
        return res.status(400).json({
          message: "You have already applied for this job",
          success: false,
        });
      }
  
      // Check if the job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({
          message: "Job not found",
          success: false,
        });
      }
  
      // Create a new application
      const newApplication = await Application.create({
        job: jobId,
        applicant: userId,
      });
  
      job.applications.push(newApplication._id); // Add the application ID to the job's applications array
      await job.save(); // Save the job
  
      return res.status(201).json({
        message: "Job applied successfully.",
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
 applyJob Ending
**********************
*/


/*
**********************
getAppliedJobs Starting 
**********************
*/
export const getAppliedJobs = async (req, res) => {
    try {
      console.log('Request body in getAppliedJobs:', req.body);
      const userId = req.id;
      const applications = await Application.find({ applicant: userId })
        .sort({ createdAt: -1 })
        .populate({
          path: 'job',
          options: { sort: { createdAt: -1 } },
          populate: {
            path: 'company',
            options: { sort: { createdAt: -1 } },
          }
        });
  
      if (!applications.length) {
        return res.status(404).json({
          message: "No Applications found.",
          success: false,
        });
      }
  
      return res.status(200).json({
        applications,
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
getAppliedJobs Ending 
**********************
*/
// admin dekhega kitna user ne apply kiya hai


/*
**********************
 getApplicants Starting
**********************
*/
export const getApplicants = async (req, res) => {
  try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({
          path: 'applications',
          options: { sort: { createdAt: -1 } },
          populate: {
              path: 'applicant',
          },
      });

      if (!job) {
          return res.status(404).json({
              message: 'Job not found.',
              success: false,
          });
      }

      return res.status(200).json({
          job,
          success: true,
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error', success: false });
  }
};

/*
**********************
 getApplicants Ending
**********************
*/


/*
**********************
 updateStatus Starting
**********************
*/
export const updateStatus = async (req, res) => {
    try {
        console.log('Request body in updateStatus:', req.body);  // Add this log to check the incoming body
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false
            })
        };

        // find the application by application id
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}


