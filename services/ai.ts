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
  },

  /**
   * Extracts conference session details from raw HTML content.
   */
  async extractSessions(content: string): Promise<Session[]> {
    const prompt = `
      You are a data extraction expert. Extract a list of conference sessions from the following content (HTML or raw text).
      
      CRITICAL INSTRUCTIONS:
      - Return ONLY a valid JSON array of objects.
      - If the content does not contain a clear agenda, return [].
      - DO NOT INVENT SESSIONS. DO NOT USE PLACEHOLDERS.
      - Infer the year as 2026 unless otherwise specified.
      - Handle multi-day agendas (e.g., "Day 1", "Wednesday March 11"). Assign the correct date to each session.
      - Extract speakers from text like "Terence Flotte, MD" or "Presenter(s): Lars Petersen".
      
      For each session, extract:
      - title: The name of the session
      - date: YYYY-MM-DD format
      - startTime: e.g. "09:00 am" (normalize from formats like "10:05 a.m. ET")
      - endTime: e.g. "10:30 am"
      - location: Hall name (default "Main Hall")
      - track: Category (default "General")
      - speakers: Array of strings
      - type: "Symposium", "Oral", "Poster", "Keynote"
      - priority: "Critical", "High", "Medium", "Low"
      
      Input Content:
      ${content.substring(0, 50000)}
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt,
        config: {
          temperature: 0.1,
        }
      });

      const text = response.text || "[]";
      // Clean up markdown code blocks if the model includes them despite instructions
      const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();

      const parsed = JSON.parse(jsonStr);

      // Map to Session interface types with normalization
      return parsed.map((item: any, index: number) => {
        // Simple normalization for enums
        const normalize = (val: string, allowed: string[], fallback: string) => {
          if (!val) return fallback;
          const found = allowed.find(a => a.toLowerCase() === val.toLowerCase());
          return found || fallback;
        };

        const type = normalize(item.type, ['Oral', 'Poster', 'Keynote', 'Symposium', 'Booth'], 'Symposium');
        const priority = normalize(item.priority, ['Critical', 'High', 'Medium', 'Low'], 'Medium');

        return {
          id: `extracted-${Date.now()}-${index}`,
          conferenceId: '', // Set by caller
          title: item.title || "Untitled Session",
          abstractId: `EXT-${index}`,
          date: item.date || '2026-05-29',
          startTime: item.startTime || '09:00 am',
          endTime: item.endTime || '10:00 am',
          location: item.location || 'Main Hall',
          track: item.track || 'General',
          type: type as any,
          priority: priority as any,
          status: 'Unassigned',
          assignedTo: [],
          roomNo: item.location || '',
          speakers: item.speakers || [],
          matchScore: 0
        };
      });

    } catch (error) {
      console.error("AI Extraction Error:", error);
      return [];
    }
  }
};
