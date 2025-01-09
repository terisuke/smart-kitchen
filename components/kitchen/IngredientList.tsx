import { Button } from "../ui/Button.tsx";
import { Card, CardBody } from "../ui/Card.tsx";

export type IngredientListProps = {
  ingredients: string[];
  onRemove: (index: number) => void;
};

export function IngredientList({ ingredients, onRemove }: IngredientListProps) {
  if (ingredients.length === 0) {
    return (
      <Card class="bg-gray-50">
        <CardBody>
          <p class="text-gray-500 text-center">No ingredients added yet.</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div class="space-y-2">
      {ingredients.map((ingredient, index) => (
        <div key={index} class="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
          <span class="text-gray-700">{ingredient}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onRemove(index)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}