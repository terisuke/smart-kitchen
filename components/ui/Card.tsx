import { ComponentChildren } from "preact";

export type CardProps = {
  children: ComponentChildren;
  class?: string;
};

export function Card({ children, class: className = "" }: CardProps) {
  return (
    <div class={`bg-white rounded-lg shadow-md overflow-hidden ${className}`.trim()}>
      {children}
    </div>
  );
}

export function CardHeader({ children, class: className = "" }: CardProps) {
  return (
    <div class={`px-6 py-4 border-b border-gray-200 ${className}`.trim()}>
      {children}
    </div>
  );
}

export function CardBody({ children, class: className = "" }: CardProps) {
  return (
    <div class={`px-6 py-4 ${className}`.trim()}>
      {children}
    </div>
  );
}

export function CardFooter({ children, class: className = "" }: CardProps) {
  return (
    <div class={`px-6 py-4 border-t border-gray-200 ${className}`.trim()}>
      {children}
    </div>
  );
}