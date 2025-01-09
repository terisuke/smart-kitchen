// routes/api/analyze.ts
import { Handler } from "$fresh/server.ts";
import { analyzeIngredientsAPI, APIError } from "../../utils/api.ts";

export const handler: Handler = async (req) => {
  try {
    const ingredients = await req.json();
    console.log("Received ingredients:", ingredients);
    if (!Array.isArray(ingredients)) {
      throw new APIError(400, "Invalid input format");
    }
    const result = await analyzeIngredientsAPI(ingredients);
    console.log("API result:", result);

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    if (error instanceof APIError) {
      console.error(`Error: ${error.message}, Status: ${error.status}`);
      return new Response(JSON.stringify({ error: error.message }), {
        status: error.status,
        headers: { "Content-Type": "application/json" },
      });
    } else if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.error("Unknown error", error);
      return new Response(JSON.stringify({ error: "Unknown error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
};
