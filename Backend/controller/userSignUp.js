import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
async function userSignUpcontroller(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Please enter your Email address",
        error: true,
        success: false,
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Please enter your password",
        error: true,
        success: false,
      });
    }
    if (!name) {
      return res.status(400).json({
        message: "Please enter your name",
        error: true,
        success: false,
      });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
        error: true,
        success: false,
      });
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    if (!hash) throw new Error("Something went wrong while hashing the password");

    // Prepare the payload with hashed password
    const payload = {
      email,
      password: hash,
      name,
      profilepic: req.body.profilepic || '', // Optional profile pic
    };

    // Save user to the database
    const userData = new userModel(payload);
    const savedUser = await userData.save();

    // Send response
    return res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
}

export default userSignUpcontroller;
