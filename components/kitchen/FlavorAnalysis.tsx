import { useState } from "preact/hooks";
import { Card, CardBody, CardHeader } from "../ui/Card.tsx";
import { Button } from "../ui/Button.tsx";

export type Recipe = {
  name: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
};

export type AnalysisResult = {
  flavor: string;
  suggestions: string[];
  recipes?: Recipe[];  // 詳細なレシピ情報を追加
  loading?: boolean;
};

export type FlavorAnalysisProps = {
  result?: AnalysisResult;
};

export function FlavorAnalysis({ result }: FlavorAnalysisProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  if (!result) {
    return null;
  }

  if (result.loading) {
    return (
      <Card>
        <CardBody>
          <div class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        </CardBody>
      </Card>
    );
  }

const handleViewRecipe = (recipeName: string) => {
    const recipe = result.recipes?.find(r => r.name === recipeName);
    setSelectedRecipe(recipe || {
      name: recipeName,
      description: "Loading...",
      ingredients: ["Loading..."],
      instructions: ["Loading recipe details..."]
    });
  };

return (
    <div class="space-y-4">
      <Card>
        <CardHeader>
          <h2 class="text-xl font-semibold">材料の分析結果</h2>
        </CardHeader>
        <CardBody>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-700">材料の特徴</h3>
              <p class="mt-1 text-gray-600">{result.flavor}</p>
            </div>
            
            <div>
              <h3 class="font-medium text-gray-700">料理の提案</h3>
              <div class="mt-2 space-y-2">
                {result.suggestions.map((suggestion, index) => (
                  <div key={index} class="flex items-center justify-between">
                    <span class="text-gray-600">• {suggestion}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewRecipe(suggestion)}
                    >
                      View Recipe
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {selectedRecipe && (
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">{selectedRecipe.name}</h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedRecipe(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div class="space-y-4">
              {selectedRecipe.description && (
                <p class="text-gray-600">{selectedRecipe.description}</p>
              )}
              <div>
                <h3 class="font-medium text-gray-700">Ingredients</h3>
                <ul class="mt-2 list-disc list-inside">
                  {selectedRecipe.ingredients?.map((ingredient, index) => (
                    <li key={index} class="text-gray-600">{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 class="font-medium text-gray-700">Instructions</h3>
                <ol class="mt-2 list-decimal list-inside space-y-2">
                  {selectedRecipe.instructions?.map((step, index) => (
                    <li key={index} class="text-gray-600">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
