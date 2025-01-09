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

// utils/api.ts
export async function analyzeIngredientsAPI(
  ingredients: string[],
): Promise<AnalysisResult> {
  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
  if (!OPENAI_API_KEY) {
    throw new APIError(500, "API key not configured");
  }

  try {
    console.log("Sending request to OpenAI with ingredients:", ingredients);

const systemPrompt = `あなたは料理の専門家です。材料を分析し、味の特徴と料理の提案を行ってください。
提案したすべての料理について、詳細なレシピを含めてください。

必ず以下の形式の純粋なJSONのみを返してください。Markdownの記法や追加のテキストは含めないでください：

{
  "flavor": "風味の説明",
  "suggestions": ["料理1", "料理2", "料理3"],
  "recipes": [
    {
      "name": "料理1",
      "description": "料理の説明",
      "ingredients": ["必要な材料1（分量）", "必要な材料2（分量）"],
      "instructions": ["手順1", "手順2", "手順3"]
    }
  ]
}

重要な注意事項：
- 必ず純粋なJSONのみを返してください
- Markdown記法（例：\`\`\`json）は使用しないでください
- JSONの前後に説明テキストを入れないでください
- 提案する料理はすべて詳細なレシピを含めてください
- 材料には可能な限り具体的な分量を含めてください
- 手順は具体的で分かりやすく書いてください`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: `以下の材料を使用して調理可能な料理と、その詳細なレシピを提案してください: ${ingredients.join(", ")}`,
          },
        ],
        max_tokens: 4096,
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
        recipes: parsedContent.recipes || [],
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