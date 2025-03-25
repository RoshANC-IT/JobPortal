import User from "../2models/2user.model.js"; // Use default import
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../2utils/datauri.js";
import cloudinary from "../2utils/cloudinary.js";
/*
**********************
 Register Starting
**********************
*/
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const file = req.file;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      // Validate fullname, email, phoneNumber, password, role
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `User already exists ${fullname}`, success: false });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePhoto = "";

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhoto = cloudResponse.secure_url;
    }

    // Create new User
    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profilePic: profilePhoto,
    });

    await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Login Logic

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate email, password, and role
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password, and role are required.",
        success: false,
      });
    }

    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // Check if the user's role matches the provided role
    if (user.role !== role) {
      return res.status(400).json({
        message: "Role mismatch. Please select the correct role.",
        success: false,
      });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    // generateToken JWT token
    const tokenData = { userId: user._id };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Prepare user response
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

/*
**********************
 Register  Ending
**********************
*/

/*
**********************
 logout Starting
**********************
*/
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
/*
**********************
 logout Ending
**********************
*/

/*
**********************
 updateProfile Starting
**********************
*/

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; //
    let skillsArray = []; // Array of skills

    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim());
    }

    const userId = req.id; // Middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Updating user fields
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Handling file upload (resume or profile photo)
    if (file) {
      try {
        const fileUri = getDataUri(file); // Convert file to data URI
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content); // Upload to Cloudinary

        if (cloudResponse && cloudResponse.secure_url) {
          user.profile.resume = cloudResponse.secure_url;
          user.profile.resumeOriginalName = file.originalname;
        }
      } catch (uploadError) {
        console.error("Error uploading file to Cloudinary:", uploadError); // Log detailed upload error
        return res.status(500).json({
          message: "Error uploading file to Cloudinary.",
          success: false,
          error: uploadError.message, // Return error message for debugging
        });
      }
    }

    await user.save();

    // Rebuild user response object
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.error("Error updating profile:", error); // Log detailed error
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
      error: error.message, // Return error message for debugging
    });
  }
};
