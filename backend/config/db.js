import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("Failed to connect to the database", error);
        process.exit(1); // Keluar dari proses jika koneksi gagal
    }
};
