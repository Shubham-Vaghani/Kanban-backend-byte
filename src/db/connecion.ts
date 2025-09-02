import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongodbURI =
      process.env.MONGODB_URI || "mongodb://localhost:27017/task-manager";
    const conn = await mongoose.connect(mongodbURI);

    console.log("Mongodb connected :>> ", conn.connection.host);
  } catch (error) {
    console.error("Error connectiong to mongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
