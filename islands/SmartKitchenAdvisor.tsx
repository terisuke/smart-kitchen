import { useState } from "preact/hooks";
import { IngredientInput } from "../components/kitchen/IngredientInput.tsx";
import { IngredientList } from "../components/kitchen/IngredientList.tsx";
import { FlavorAnalysis, type AnalysisResult } from "../components/kitchen/FlavorAnalysis.tsx";
import { Button } from "../components/ui/Button.tsx";
import { Card, CardBody, CardHeader } from "../components/ui/Card.tsx";

export default function SmartKitchenAdvisor() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | undefined>();

  const handleAddIngredient = (ingredient: string) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAnalyzeIngredients = async () => {
    if (ingredients.length === 0) return;

    setAnalysis({ loading: true, flavor: "", suggestions: [] });

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredients),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();
      setAnalysis({
        loading: false,
        flavor: result.flavor,
        suggestions: result.suggestions,
        recipes: result.recipes  // レシピ情報を追加
      });
      
      console.log('Setting analysis state:', {
        loading: false,
        flavor: result.flavor,
        suggestions: result.suggestions,
        recipes: result.recipes
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis(undefined);
    }
  };

  return (
    <div class="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <h1 class="text-2xl font-bold">スマートキッチンハッカー</h1>
          <p class="text-gray-600 mt-1">お前の食生活をAIがハックする！</p>
        </CardHeader>
        <CardBody>
          <div class="space-y-6">
            <IngredientInput onAdd={handleAddIngredient} />
            
            {ingredients.length > 0 && (
              <div class="space-y-4">
                <IngredientList
                  ingredients={ingredients}
                  onRemove={handleRemoveIngredient}
                />
                
                <Button
                  onClick={handleAnalyzeIngredients}
                  disabled={ingredients.length === 0}
                  className="w-full"
                >
                  料理を提案!
                </Button>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {analysis && <FlavorAnalysis result={analysis} />}
    </div>
  );
}