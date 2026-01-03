
import { GoogleGenAI } from "@google/genai";

export type SuccessPillar = 'business' | 'cv' | 'wealth';

/**
 * Generates high-impact strategic plans for wealth, career, or business.
 */
export const generateSuccessPlan = async (input: string, mode: SuccessPillar): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use Pro for Wealth/Career strategy, Flash for quick business ideation
  const modelName = mode === 'business' ? 'gemini-3-flash-preview' : 'gemini-3-pro-preview';
  
  try {
    let systemInstruction = "";
    let prompt = "";

    switch(mode) {
      case 'wealth':
        systemInstruction = "You are a Wealth Generation Specialist and Passive Income Strategist. Your goal is to identify high-ROI, low-friction wealth-building strategies. Focus on automation, side-hustles, and financial roadmaps for people up to age 65.";
        prompt = `Generate a 'Wealth Acceleration Blueprint' for: "${input}"
          Include:
          - ## The High-Margin Strategy: A refined wealth concept focusing on ROI.
          - ## Automation Potential: How to make this 'easy money' using tools/AI.
          - ## Path to First $1,000: A concrete 30-day action plan.
          - ## Demographic Fit: Why this works for users up to age 65.
          - ## Wealth Slogan: An empowering financial tagline.`;
        break;
      case 'cv':
        systemInstruction = "You are an Executive Career Architect. Transform skills into high-impact professional brands that command high salaries and authority.";
        prompt = `Refine this professional profile into a high-impact 'Career Edge' report: "${input}"
          Include:
          - ## Executive Summary: A powerful 3-sentence summary for a top-tier CV.
          - ## Skill Monetization: How to turn these specific skills into high-paying roles/gigs.
          - ## The Hidden Value: USPs the user should highlight to double their perceived value.
          - ## Market Positioning: Where the user should focus their digital presence.
          - ## Career Tagline: A punchy, professional brand line.`;
        break;
      case 'business':
        systemInstruction = "You are a Startup Mentor and Innovation Consultant. Transform raw ideas into actionable, scalable startup blueprints.";
        prompt = `Incubate this raw business idea into a startup blueprint: "${input}"
          Include:
          - ## The Refined Pitch: A professional 2-sentence value proposition.
          - ## Market Viability: Why this idea is a winner in the current economy.
          - ## Target Audience: High-value customer segments.
          - ## Execution Roadmap: Phase 1 launch strategy.
          - ## Innovation Slogan: A catchy, memorable startup phrase.`;
        break;
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        // Pro model supports high thinking budget for complex wealth/career reasoning
        ...(modelName === 'gemini-3-pro-preview' && { thinkingConfig: { thinkingBudget: 32768 } })
      }
    });
    
    return response.text || "Failed to generate success plan. Please try again.";

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The Success Engine is currently optimizing. Please try again in a moment.");
  }
};
