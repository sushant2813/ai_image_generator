import express from "express";
import { generateImage } from "../controllers/GenerateImage.js";

const router = express.Router();

// Define a unique route for image generation
router.post("/", generateImage);

export default router;
