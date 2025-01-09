import { JSX } from "preact";
import { useState } from "preact/hooks";
import { Button } from "../ui/Button.tsx";
import { Input } from "../ui/Input.tsx";

export type IngredientInputProps = {
  onAdd: (ingredient: string) => void;
};

export function IngredientInput({ onAdd }: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 入力値の安全性チェックを強化
    const trimmedValue = inputValue?.trim() ?? "";
    if (trimmedValue) {
      onAdd(trimmedValue);
      setInputValue("");
    }
  };

  const handleChange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const newValue = (e.target as HTMLInputElement).value;
    setInputValue(newValue || "");
  };

  return (
    <form
      class="flex gap-2"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Enter an ingredient..."
        required
        value={inputValue || ""}
        onChange={handleChange}
      />
      <Button 
        type="submit" 
        variant="primary"
        disabled={!inputValue?.trim()}
      >
        Add
      </Button>
    </form>
  );
}