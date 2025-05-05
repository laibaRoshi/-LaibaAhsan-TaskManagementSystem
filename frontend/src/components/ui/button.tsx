
import * as React from "react";
import { cn } from "../../lib/utils";

export const buttonVariants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  ghost: "bg-transparent hover:bg-gray-100",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  link: "text-blue-600 underline hover:text-blue-800",
};

export const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3 text-sm",
  lg: "h-11 px-6",
  icon: "h-10 w-10",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "rounded text-sm font-medium transition-colors focus:outline-none inline-flex items-center justify-center",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";