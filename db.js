import mongoose, { mongo } from "mongoose";

export default async function connectDB(url) {
  try {
    const conn = await mongoose.connect(url);
    console.log(
      "Successfully connected to MongoDB database:",
      conn.connection.host
    );
  } catch (err) {
    console.log("Error connecting to the database!", err);
  }
}
