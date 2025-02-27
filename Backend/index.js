// import express from "express";
// import cors from "cors";
// import connectdb from "./config/db.js"; // Make sure to use the correct file extension for ES modules
// import router from "./routes/index.js"; // Also ensure proper file extension
// import dotenv from "dotenv";

// dotenv.config();

// const Port = process.env.PORT || 8000;
// const app = express();

// app.use(cors());
// app.use(express.json()); // Ensure body parsing is included
// app.use("/api", router);

// connectdb().then(() => {
//   app.listen(Port, () => {
//     console.log("Connected to DB");
//     console.log(`Server is running on port ${Port}`);
//   });
// });
