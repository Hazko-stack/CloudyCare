import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, text, size = 'md', ...props }, ref) => {
    const getTypographyClass = (size: string) => {
      switch (size) {
        case 'sm': return 'button-text-sm';
        case 'lg': return 'button-text-lg';
        default: return 'button-text';
      }
    };

    const classes = cn(
      "w-full", 
      "py-[10px] px-4", 
      "bg-[#FADA7A]", 
      "text-white", 
      "rounded-[10px] transition-colors", 
      "flex items-center justify-center",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      getTypographyClass(size), 
      className
    );

    return (
      <button ref={ref} className={classes} {...props}>
        {text}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
