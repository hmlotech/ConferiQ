import { GoogleGenAI } from "@google/genai";
import { Session } from '../types';

// Initialize Gemini API client
// Note: process.env.API_KEY is assumed to be configured in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'demo-key' });

export const AIService = {
  /**
   * Generates a daily executive briefing based on all provided sessions.
   */
  async generateDailyBrief(sessions: Session[]): Promise<string> {
    const sessionContext = sessions.map(s => 
      `- [${s.startTime}] ${s.title} (${s.track}) - Priority: ${s.priority}`
    ).join('\n');

    const prompt = `
      Act as a Lead Competitive Intelligence Analyst for a top Biopharma company covering the AACR conference.
      
      Analyze the following schedule of sessions for today:
      ${sessionContext}

      Generate a high-level "Daily Executive Briefing" (approx 300 words).
      
      Format the response with the following sections (use Markdown):
      ## Executive Summary
      [Brief overview of the day's strategic importance]
      
      ## Critical Threats & Alerts
      [Identify sessions with potential high-impact competitor data, especially regarding Lead-212 and Radioligand therapies]
      
      ## Strategic Opportunities
      [Where our team should focus to capture coverage gaps]
      
      ## Recommended Actions
      [Bullet points for the leadership team]
      
      Tone: Professional, urgent, and insight-driven.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.3,
          maxOutputTokens: 1000,
        }
      });
      return response.text || "No insights generated.";
    } catch (error) {
      console.error("AI Generation Error:", error);
      return "## System Notice\n\nUnable to connect to the Insights Engine. Please verify your API key configuration.";
    }
  },

  /**
   * Generates a specific topic report or draft.
   */
  async generateTopicDraft(topic: string, sessions: Session[]): Promise<string> {
    // Filter sessions relevant to the topic (simple string matching for demo)
    const relevantSessions = sessions.filter(s => 
      s.title.includes(topic) || s.track.includes(topic) || s.abstractId.includes(topic)
    );

    const sessionContext = relevantSessions.length > 0 
      ? relevantSessions.map(s => `- ${s.title}`).join('\n')
      : "No specific sessions found, generate general industry trends.";

    const prompt = `
      Generate a draft field report focusing on "${topic}".
      
      Context - Sessions related to this topic:
      ${sessionContext}

      The report should include:
      1. **Theme Overview**: What is the consensus narrative emerging?
      2. **Key Debates**: What are the controversial points being discussed?
      3. **Consensus Shift**: Has the scientific opinion shifted since last year?
      
      Keep it concise and ready for internal distribution.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.5,
          maxOutputTokens: 800,
        }
      });
      return response.text || "No report generated.";
    } catch (error) {
      console.error("AI Generation Error:", error);
      return "Unable to generate draft. Please try again later.";
    }
  }
};
