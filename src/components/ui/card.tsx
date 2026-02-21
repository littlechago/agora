import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-stone-200 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
