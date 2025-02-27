// import express from "express";
// import { login, logout, register, updateProfile } from "../2controllers/user.controller.js";
// import isAuthenticated from "../2middlewares/isAuthenticated.js";
// import {singleUpload} from "../2middlewares/multer.js";
// const router = express.Router();
// router.route("/register").post(singleUpload,register);
// router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
// export default router;
import express from 'express';
import { login, logout, register, updateProfile } from '../2controllers/user.controller.js';
import isAuthenticated from '../2middlewares/isAuthenticated.js';
import { singleUpload } from '../2middlewares/multer.js';

const router = express.Router();

// Routes
router.route('/register').post(singleUpload, register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/profile/update').post(isAuthenticated, singleUpload, updateProfile);//  /api/user/profile/update
///api/user/profile/update
export default router;
