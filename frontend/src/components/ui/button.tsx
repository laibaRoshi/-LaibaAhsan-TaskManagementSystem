
import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "ghost" | "default" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
};

export const Button: React.FC<ButtonProps> = ({ children, variant = "default", size = "default", ...props }) => {
  let baseStyle = "rounded text-sm font-medium transition-colors focus:outline-none inline-flex items-center justify-center";

  const variantStyles: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "bg-transparent hover:bg-gray-100",
  };

  const sizeStyles: Record<string, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-6",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
