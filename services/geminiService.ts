
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_MODEL_NAME } from "../constants";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY for Gemini is not set. Explanations will not be available.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const getGeminiExplanation = async (topicTitle: string, formulaText: string): Promise<string> => {
  if (!ai) {
    return "Gemini API key not configured. Unable to fetch explanation.";
  }

  const prompt = `
You are an expert academic assistant specializing in advanced mathematics, agent-based systems, and computational theory.
Please explain the following concept titled "${topicTitle}". The concept is defined by the following formulas/text:

--- START OF CONCEPT ---
${formulaText}
--- END OF CONCEPT ---

Provide a clear and concise explanation suitable for a university student or researcher with a strong background in computer science and mathematics.
Focus on:
1. The core idea and purpose of the concept.
2. Key mathematical principles or mechanisms involved.
3. Its typical application or significance within its domain (e.g., F0Z frameworks, agent systems, quantum computing).

Break down complex parts into understandable segments. You may use analogies if helpful, but maintain a formal and academic tone.
Do not repeat the provided formula text verbatim in your explanation unless you are specifically quoting a small part to discuss it.
Output the explanation directly.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching explanation from Gemini:", error);
    if (error instanceof Error) {
        return `Failed to get explanation: ${error.message}`;
    }
    return "Failed to get explanation due to an unknown error.";
  }
};
