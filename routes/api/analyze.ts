// routes/api/analyze.ts
import { Handler } from "$fresh/server.ts";
import { analyzeIngredientsAPI, APIError } from "../../utils/api.ts";

export const handler: Handler = async (req) => {
  try {
    // リクエストの内容をログ出力
    const body = await req.text();
    console.log("Raw request body:", body);

    // JSONとしてパース
    const ingredients = JSON.parse(body);
    console.log("Parsed ingredients:", ingredients);

    // 入力値の検証
    if (!Array.isArray(ingredients)) {
      console.error("Invalid input: not an array", ingredients);
      throw new APIError(400, "Invalid input: expected an array of ingredients");
    }

    if (ingredients.length === 0) {
      console.error("Invalid input: empty array");
      throw new APIError(400, "Invalid input: no ingredients provided");
    }

    if (!ingredients.every(item => typeof item === "string")) {
      console.error("Invalid input: non-string items", ingredients);
      throw new APIError(400, "Invalid input: all ingredients must be strings");
    }

    // API呼び出し
    const result = await analyzeIngredientsAPI(ingredients);
    console.log("API response:", result);

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error details:", {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack,
    });

    if (error instanceof APIError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: error.status,
        headers: { "Content-Type": "application/json" },
      });
    } else if (error instanceof SyntaxError) {
      return new Response(JSON.stringify({ error: "Invalid JSON in request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ error: "Internal Server Error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
};