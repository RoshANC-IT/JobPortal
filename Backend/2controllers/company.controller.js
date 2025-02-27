import { Company } from "../2models/2company.model.js";
import getDataUri from "../2utils/datauri.js";
import cloudinary from "../2utils/cloudinary.js";

/*
**********************
 registerCompany Starting
**********************
*/

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName || typeof companyName !== "string" || !companyName.trim()) {
      return res.status(400).json({
        message: "Company name is required and must be a valid string.",
        success: false,
      });
    }

    // Check if company already exists
    let company = await Company.findOne({ name: companyName.trim() });
    if (company) {
      return res.status(400).json({
        message: "You can't register the same company.",
        success: false,
      });
    }

    // Create new company
    company = await Company.create({
      name: companyName.trim(),
      userId: req.id, // Assumes `id` is set by isAuthenticated middleware
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error while registering company:", error);
    return res.status(500).json({
      message: "An error occurred while registering the company.",
      success: false,
      error: error.message,
    });
  }
};





/*
**********************
 registerCompany Ending
**********************
*/



/*
**********************
 getCompany Starting
**********************
*/
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // logged in user id
    const companies = await Company.find({ userId }); // finding companies by user id 

    if (companies.length === 0) {
      return res.status(404).json({
        message: "No companies found for this user.",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({
      message: "An error occurred while fetching companies.",
      success: false,
      error: error.message,
    });
  }
};


/*
**********************
 getCompany ending
**********************
*/



/*
**********************
 getCompanyById Starting
**********************
*/

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    // if company is found 
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching the company.",
      success: false,
      error: error.message,
    });
  }
};


/*
**********************
 getCompanyById Ending
**********************
*/

/*
**********************
 updateCompany Ending
**********************
*/


// Update company controller
// export const updateCompany = async (req, res) => {
//   try {
//     const { name, description, website, location } = req.body;
//     const file = req.file;

//     let logo = null;

//     // Handle file upload if it exists
//     if (file) {
//       const fileUri = getDataUri(file);  // Convert file to Data URI
//       try {
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
//         logo = cloudResponse.secure_url;  // Set logo URL after successful upload
//       } catch (cloudError) {
//         console.error('Error uploading to Cloudinary:', cloudError);
//         return res.status(500).json({
//           message: "Error uploading logo to Cloudinary.",
//           success: false,
//           error: cloudError.message,
//         });
//       }
//     }

//     // Proceed with company update
//     const updateData = { name, description, website, location, logo };
//     const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

//     if (!company) {
//       return res.status(404).json({
//         message: "Company not found.",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       message: "Company information updated.",
//       success: true,
//       company,
//     });
//   } catch (error) {
//     console.error("Error in updateCompany controller:", error);
//     return res.status(500).json({
//       message: "An error occurred while updating the company.",
//       success: false,
//       error: error.message,
//     });
//   }
// };


export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    let logo = null;

    // Handle file upload if it exists
    if (file) {
      const fileUri = getDataUri(file);  // Convert file to Data URI
      try {
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);  // Upload to Cloudinary
        logo = cloudResponse.secure_url;  // Set logo URL after successful upload
      } catch (cloudError) {
        console.error('Error uploading to Cloudinary:', cloudError);
        return res.status(500).json({
          message: "Error uploading logo to Cloudinary.",
          success: false,
          error: cloudError.message,
        });
      }
    }

    // Prepare data to be updated
    const updateData = { name, description, website, location, logo };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully.",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error in updateCompany controller:", error);
    return res.status(500).json({
      message: "An error occurred while updating the company.",
      success: false,
      error: error.message,
    });
  }
};

/*
**********************
 updateCompany Ending
**********************
*/
