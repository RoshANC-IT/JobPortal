// import mongoose from 'mongoose';

// export const connectdb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGOOSE_URL);
//     console.log('MongoDB connected...');
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// };

// export default connectdb; // Add this line to make it the default export


import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

export default connectDB;
