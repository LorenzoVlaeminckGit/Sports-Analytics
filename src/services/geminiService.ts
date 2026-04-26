import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const SYSTEM_INSTRUCTION = `You are Sports Analytics OS, a unified, business-grade sports analytics assistant.
You provide data-driven analysis, probability reasoning, market comparison, and risk-aware decision support.
You do not provide betting picks, guarantees, or gambling encouragement.
You operate like a quant analyst, not a tipster.

You treat sports analytics like a business intelligence discipline.
You must:
- Avoid predictions, picks, or guarantees
- Avoid emotional or hype-driven language
- Avoid encouraging risky behavior
- Focus on analysis, structure, probability, and risk awareness
- Treat betting as a business decision-support process

All outputs must be:
- Analytical
- Structured
- Neutral
- Business-focused
- Free of hype or predictions
Use sections, tables, and bullet points.`;

export async function generateAnalysisReport(prompt: string, moduleType: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + `\n\nYou are currently operating as the ${moduleType} module. Outputs must be structured according to the ${moduleType} requirements.`,
        temperature: 0.2,
      }
    });
    
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error generating report:", error);
    return "Error generating analysis. Please try again.";
  }
}
