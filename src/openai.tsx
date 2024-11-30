import {GoogleGenerativeAI} from "@google/generative-ai"

export async function SendMessageToOpenAi(input: string){
  console.log("inside SendMessageToOpenAiApi")
  const genAI = new GoogleGenerativeAI("AIzaSyADZ9aFkkrMfJ9N6bDd22CuWk0JQwfsxhc");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const result = await model.generateContent(input);
console.log(result.response.text());

return result.response.text()
}