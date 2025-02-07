import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import generateImageRoute from "./routes/GenerateImage.js";
import posts from "./routes/Posts.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

// Routes
app.use("/api/generateImage", generateImageRoute);
app.use("/api/post", posts);

// Error Handler Middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  console.error(`Error: ${message}`);
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Root Route
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in the .env file");
    }
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
};

// Start the Server
const startServer = async () => {
  await connectDB(); // Ensure DB connection before starting server
  try {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
};

startServer();
