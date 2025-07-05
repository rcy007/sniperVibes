import React from "react";

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className = "", ...props }) => (
  <div
    className={`rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/30 backdrop-blur-xs shadow-sm ${className}`}
    {...props}
  />
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className = "", ...props }) => (
  <button
    className={`rounded-md px-4 py-2 bg-foreground text-background disabled:opacity-60 ${className}`}
    {...props}
  />
); 