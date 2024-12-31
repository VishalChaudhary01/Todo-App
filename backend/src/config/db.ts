import mongoose from "mongoose";

export const connectToDB = async () => {
     try {
          await mongoose.connect(process.env.DATABASE_URL!);
          console.log("Database connected!!");
     } catch (error) {
          console.error(error);
          process.exit(1);
     }
}