import * as dotenv from "dotenv";
import { createError } from "../error.js";
import OpenAI from "openai";

dotenv.config();

// Setup OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Prompt is required"));
    }

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const generatedImage = response.data[0].b64_json;
    res.status(200).json({ photo: generatedImage });
  } catch (error) {
    next(
      createError(
        error.response?.status || 500,
        error.response?.data?.error?.message || error.message
      )
    );
  }
};
