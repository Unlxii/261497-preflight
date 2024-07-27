import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri =
    process.env.MONGO_URI || "mongodb+srv://pun:punpun55@url-shorter.gwa6kec.mongodb.net/?retryWrites=true&w=majority&appName=url-shorter";

  try {
    const connect = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
    });
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
