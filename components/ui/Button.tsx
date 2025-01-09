import { IS_BROWSER } from "$fresh/runtime.ts";
import { JSX } from "preact";

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: preact.ComponentChildren;
  onClick?: JSX.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export function Button({
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  onClick,
  className,
}: ButtonProps) {
  const baseStyles =
    "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    secondary:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500",
    outline:
      "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={!IS_BROWSER || disabled}
      class={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
