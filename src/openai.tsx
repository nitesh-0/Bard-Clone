import { GoogleGenerativeAI } from "@google/generative-ai";

export async function SendMessageToOpenAi(input: string) {
  console.log("Inside SendMessageToOpenAiApi");
  const apiKey = import.meta.env.VITE_OPENAI_SECRET || "";

  // const apiKey = "AIzaSyADZ9aFkkrMfJ9N6bDd22CuWk0JQwfsxhc"
  console.log("API Key:", process.env.REACT_APP_OPENAI_SECRET);
  if (!apiKey) {
    throw new Error("API key is not defined. Check your environment variables.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  try {
    const result = await model.generateContent(input);
    console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
