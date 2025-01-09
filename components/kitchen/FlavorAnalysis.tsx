import { Card, CardBody, CardHeader } from "../ui/Card.tsx";

export type AnalysisResult = {
  flavor: string;
  suggestions: string[];
  loading?: boolean;
};

export type FlavorAnalysisProps = {
  result?: AnalysisResult;
};

export function FlavorAnalysis({ result }: FlavorAnalysisProps) {
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

  return (
    <Card>
      <CardHeader>
        <h2 class="text-xl font-semibold">Flavor Analysis</h2>
      </CardHeader>
      <CardBody>
        <div class="space-y-4">
          <div>
            <h3 class="font-medium text-gray-700">Flavor Profile</h3>
            <p class="mt-1 text-gray-600">{result.flavor}</p>
          </div>
          
          <div>
            <h3 class="font-medium text-gray-700">Suggested Dishes</h3>
            <ul class="mt-2 space-y-1">
              {result.suggestions.map((suggestion, index) => (
                <li key={index} class="text-gray-600">
                  • {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}