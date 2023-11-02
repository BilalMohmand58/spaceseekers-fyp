import express from "express";
import dotenv from "dotenv";
import mongoose, { disconnect } from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import apartmentRoute from "./routes/apartment.js";

dotenv.config();
const app = express();
// allow to send json to server
app.use(express.json());
// Database Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Database Connected!!");
  } catch (error) {
    throw error;
  }
};
// MongoDB Connection
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB Disconnected");
});

//Middlewares
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/apartment", apartmentRoute);

// Error Handling middleware
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to Backend!!");
});
