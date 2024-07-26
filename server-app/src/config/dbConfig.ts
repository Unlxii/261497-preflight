import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`mongodb://localhost:27017/shorterURL`);
    console.log(
      "MongoDB Connected:",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log("Error:", error);
    process.exit(1);
  }
};

export default connectDB;
