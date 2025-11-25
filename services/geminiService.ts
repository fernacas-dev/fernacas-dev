import { GoogleGenAI } from "@google/genai";
import { ProfileData } from "../types";

const getSystemInstruction = () => `
You are an expert Developer Advocate and Technical Writer. 
Your goal is to generate professional, clean, and engaging GitHub Profile READMEs (Markdown).
You must follow a specific structure provided by the user, using the data they provide.
Use clear headings, proper lists, and relevant emojis to make it visually appealing but professional.
Do not wrap the output in markdown code blocks (like \`\`\`markdown). Just return the raw markdown text.
`;

export const generateReadme = async (data: ProfileData): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Create a GitHub Profile README.md based strictly on the following details:

    Name: ${data.name}
    Role/Title: ${data.role}
    Introduction: ${data.intro}

    [Section: About Me]
    - Items: ${data.aboutItems}

    [Section: Main Tech Stack]
    - Backend: ${data.techStack.backend}
    - Frontend: ${data.techStack.frontend}
    - Tools: ${data.techStack.tools}

    [Section: What I Usually Work On]
    - Items: ${data.workItems}

    [Section: Some Things You'll Find Here]
    - Items: ${data.repoItems}

    [Section: Contact]
    - Info: ${data.contact}

    STYLE GUIDE:
    - Start with a H1 header like "# 👋 Hi, I'm [Name]"
    - Follow with the Role and Introduction text.
    - Use H2 headers for sections (e.g., "## 🧠 About Me", "## 🛠️ Main Tech Stack").
    - For Tech Stack, verify if the input has categories. If so, group them (Backend, Frontend, Tools).
    - Use bullet points for lists.
    - Keep it clean, concise, and professional.
    - Match the tone of a senior developer/freelancer.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 0.3, // Low temperature for consistent, professional formatting
      },
    });

    return response.text || "# Error generating content";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
