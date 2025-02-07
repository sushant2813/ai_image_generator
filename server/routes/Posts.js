import express from "express";
import { createPost, getAllPosts } from "../controllers/Posts.js";

const router = express.Router();

// Routes for posts
router.get("/", getAllPosts);
router.post("/", createPost);

export default router;
