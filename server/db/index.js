import mongoose from "mongoose";

const DB_NAME = "connectify";

const connectDB = async () => {
  return await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
};

export { connectDB };
