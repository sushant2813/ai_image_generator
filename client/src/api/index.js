import axios from "axios";

// ✅ Corrected Base URL
const API = axios.create({
  baseURL: "https://ai-image-generator-1-xl32.onrender.com/api",
});

// ✅ Corrected Endpoints
export const GetPosts = async () => await API.get("/post"); // GET all posts
export const CreatePost = async (data) => await API.post("/post", data); // POST a new post
export const GenerateImageFromPrompt = async (data) =>
  await API.post("/generateImage", data); // POST request to generate an image
