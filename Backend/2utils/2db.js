import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // Ensure environment variables are loaded
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGOOSE_URL; // Ensure the variable is correctly accessed
    if (!mongoURI) {
      console.error('MONGOOSE_URL is not defined in the environment variables.');
      process.exit(1); // Exit if the URI is missing
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the process with failure if connection fails
  }
};
export default connectDB;
