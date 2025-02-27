// import express from "express";
// import userSignUpcontroller from "../controller/userSignUp.js"; // Fix file extension for ES modules

// const router = express.Router();

// router.post("/signUp", userSignUpcontroller);

// export default router;


import express from "express";
// import { singleUpload } from "../middlewares/multer.js";
import { singleUpload } from "../2middlewares/multer.js";
// import { updateProfile } from "../controllers/user.controller.js";
import { updateProfile } from "../2controllers/user.controller.js";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAuthenticated from "../2middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/update-profile", isAuthenticated, singleUpload, updateProfile);

export default router;
