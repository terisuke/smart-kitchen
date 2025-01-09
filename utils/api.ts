// deno-lint-ignore-file no-explicit-any
import { AnalysisResult } from "../components/kitchen/FlavorAnalysis.tsx";

type OpenAIResponse = {
  choices: {
    message: {
      content: string;
    };
  }[];
};

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "APIError";
  }
}

export async function analyzeIngredientsAPI(
  ingredients: string[],
): Promise<AnalysisResult> {
  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
  if (!OPENAI_API_KEY) {
    throw new APIError(500, "API key not configured");
  }

  try {
    console.log("Sending request to OpenAI with ingredients:", ingredients);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "o1-mini", // モデル名を修正
        messages: [
          {
            role: "system",
            content:
              "あなたは料理の専門家です。材料を分析し、味の特徴と料理の提案を行ってください。必ず以下の形式のJSONで回答してください: {\"flavor\": \"風味の説明\", \"suggestions\": [\"料理1\", \"料理2\", \"料理3\"]}",
          },
          {
            role: "user",
            content:
              `以下の材料を分析して、調理可能な料理と風味の特徴を提案してください: ${
                ingredients.join(", ")
              }`,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error("OpenAI API Error:", {
        status: response.status,
        statusText: response.statusText,
      });
      throw new APIError(
        response.status,
        `API request failed: ${response.statusText}`,
      );
    }

    const data: OpenAIResponse = await response.json();
    console.log("OpenAI API Response:", data);

    const content = data.choices[0].message.content;
    console.log("Raw content from OpenAI:", content);

    try {
      const parsedContent = JSON.parse(content);
      console.log("Parsed content:", parsedContent);

      // 応答の形式を検証
      if (!parsedContent.flavor || !Array.isArray(parsedContent.suggestions)) {
        throw new Error("Invalid response format from OpenAI");
      }

      return {
        flavor: parsedContent.flavor,
        suggestions: parsedContent.suggestions,
      };
    } catch (e: any) {
      console.error("Parse error:", e);
      throw new APIError(500, "Failed to parse API response: " + e.message);
    }
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    console.error("Unexpected error:", error);
    throw new APIError(
      500,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}