import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateContent = async (content) => {
    try {
        const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: content + `Generate content for blog related to this title and in the html formate with tags, dont add html bowiler plate.`,
    });
    return response.text;
    } catch (error) {
        console.log("limit reach")
    }
}

export default generateContent;