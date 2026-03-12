import { tool } from "langchain";
import { z } from "zod";

// ============================================================
// Web search tool (uses Tavily if available, otherwise mock)
// ============================================================
export const webSearch = tool(
  async ({
    query,
    maxResults = 5,
    topic = "general",
  }: {
    query: string;
    maxResults?: number;
    topic?: "general" | "news" | "finance";
  }) => {
    try {
      // Try Tavily if API key is available
      if (process.env.TAVILY_API_KEY) {
        const { TavilySearch } = await import("@langchain/tavily");
        const tavilySearch = new TavilySearch({
          maxResults,
          apiKey: process.env.TAVILY_API_KEY,
          topic,
        });
        return await tavilySearch._call({ query });
      }

      // Fallback: inform agent to use its knowledge
      return `[Search unavailable - no TAVILY_API_KEY set] Please use your training knowledge to answer about: "${query}". Provide realistic, well-researched content based on common industry patterns.`;
    } catch (error) {
      return `Search error: ${error}. Please use your training knowledge instead.`;
    }
  },
  {
    name: "internet_search",
    description:
      "Search the web for market data, competitor info, industry trends. Falls back to LLM knowledge if no API key.",
    schema: z.object({
      query: z.string().describe("The search query"),
      maxResults: z
        .number()
        .optional()
        .default(5)
        .describe("Maximum results"),
      topic: z
        .enum(["general", "news", "finance"])
        .optional()
        .default("general"),
    }),
  }
);

export const searchTools = [webSearch];
