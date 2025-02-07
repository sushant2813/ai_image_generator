import * as dotenv from "dotenv";
import { createError } from "../error.js";
import OpenAI from "openai";

dotenv.config();

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
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json", // Requesting Base64 format
    });

    if (!response.data || response.data.length === 0) {
      return next(createError(500, "Failed to generate image"));
    }

    const generatedImage = response.data[0].b64_json;
    res.status(200).json({ photo: generatedImage }); // Returning Base64 data
  } catch (error) {
    next(
      createError(
        error.response?.status || 500,
        error.response?.data?.error?.message || error.message
      )
    );
  }
};
