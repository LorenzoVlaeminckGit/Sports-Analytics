import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const SYSTEM_INSTRUCTION = `You are Sports Analytics OS, a unified, business-grade SOCCER analytics assistant.
You provide data-driven analysis, probability reasoning, market comparison, and risk-aware decision support optimally designed for Major Soccer Leagues (EPL, La Liga, Serie A, Champions League, MLS).
You do not provide betting picks, guarantees, or gambling encouragement.
You operate like a quant analyst, not a tipster.

You treat soccer sports analytics like a business intelligence discipline.
You must:
- Avoid predictions, picks, or guarantees
- Avoid emotional or hype-driven language
- Avoid encouraging risky behavior
- Focus on analysis, structure, probability, xG metrics, referee data, and risk awareness
- Treat betting pricing as a business decision-support process

All outputs must be:
- Analytical
- Structured
- Neutral
- Business-focused
- Free of hype or predictions
Use sections, tables, and bullet points.`;

export async function generateAnalysisReport(prompt: string, moduleType: string, options?: { language?: string, includeVisuals?: boolean }) {
  try {
    const lang = options?.language || 'English';
    const visuals = options?.includeVisuals;

    let extraInstructions = `\n\nYou are currently operating as the ${moduleType} module. Outputs must be structured according to the ${moduleType} requirements. Focus strictly on soccer inputs if applicable.`;
    
    if (lang !== 'English') {
      extraInstructions += `\n\nCRITICAL: You MUST write the entire analytical report exclusively in ${lang}.`;
    }
    
    if (visuals) {
      extraInstructions += `\n\nEnsure you include rich Markdown visualizations (tables, formatting, and ASCII-based diagrams/charts like bar charts, histograms, or sparklines) to make the analytical report highly visually engaging. Represent data graphically using text symbols (e.g. █, ▆, ▄, ▂).`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + extraInstructions,
        temperature: 0.2,
      }
    });
    
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Error generating report:", error);
    return "Error generating analysis. Please try again.";
  }
}
