import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export type InputProps = {
  type?: "text" | "number" | "email";
  name?: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  class?: string;
  onInput?: JSX.GenericEventHandler<HTMLInputElement>;
  onChange?: JSX.GenericEventHandler<HTMLInputElement>;
  ref?: preact.RefObject<HTMLInputElement>;
};

export function Input({
  type = "text",
  placeholder,
  value,
  disabled = false,
  required = false,
  class: className = "",
  onInput,
  onChange,
  ref,
}: InputProps) {
  const baseStyles = "w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";
  const disabledStyles = "bg-gray-100 cursor-not-allowed opacity-75";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={!IS_BROWSER || disabled}
      required={required}
      class={`${baseStyles} ${disabled ? disabledStyles : ""} ${className}`.trim()}
      onInput={onInput}
      onChange={onChange}
      ref={ref}
    />
  );
}