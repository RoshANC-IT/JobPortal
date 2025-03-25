// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import connectDB from './2utils/2db.js';
// import userRoutes from './2routes/user.routes.js';
// import jobRoutes from './2routes/job.route.js';
// import companyRoutes from './2routes/company.route.js';
// import applicantRoutes from './2routes/application.route.js';
// import path from "path";

// dotenv.config();

// // Initialize express app
// const app = express();

// // CORS configuration
// const corsOptions = {
//   origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
//   methods: 'GET,POST,PUT,DELETE',
//   credentials: true, // Allow cookies to be sent with requests
// };
// const _dirname=path.resolve();

// app.use(cors(corsOptions));  // Enable CORS with the defined options
// app.use(express.json());     // to parse JSON bodies
// app.use(cookieParser());     // to parse cookies

// // Connect to MongoDB
// connectDB();
// // Use routes
// app.use('/api/user', userRoutes);      // User routes
// app.use('/api/jobs', jobRoutes);       // Job routes
// app.use('/api/companies', companyRoutes); // Company routes
// app.use('/api/applicants', applicantRoutes); // Applicant routes
// // Server setup
// const PORT = process.env.PORT || 8000;
// app.use(express.this.static(path.join(_dirname,"/Frontend/dist")))
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './2utils/2db.js';
import userRoutes from './2routes/user.routes.js';
import jobRoutes from './2routes/job.route.js';
import companyRoutes from './2routes/company.route.js';
import applicantRoutes from './2routes/application.route.js';
import path from "path";

dotenv.config();

// Initialize express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Allow cookies to be sent with requests
};
const _dirname = path.resolve();

app.use(cors(corsOptions));  // Enable CORS with the defined options
app.use(express.json());     // to parse JSON bodies
app.use(cookieParser());     // to parse cookies

// Connect to MongoDB
connectDB();
// Use routes
app.use('/api/user', userRoutes);      // User routes
app.use('/api/jobs', jobRoutes);       // Job routes
app.use('/api/companies', companyRoutes); // Company routes
app.use('/api/applicants', applicantRoutes); // Applicant routes

// Serve static files from Frontend/dist
app.use(express.static(path.join(_dirname, "Frontend", "dist")));

// Catch-all route for frontend
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

// Server setup
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
