import * as React from "react";
import { cn } from "../../lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

export const Select = ({ children, className, onValueChange, ...props }: SelectProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onValueChange) {
      onValueChange(event.target.value);
    }
  };

  return (
    <select
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onChange={handleChange}
      {...props}
    >
      {children}
    </select>
  );
};

export const SelectTrigger = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <div className={cn("flex items-center", className)}>{children}</div>;
};

export const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  return <span className="text-muted-foreground">{placeholder}</span>;
};

export const SelectContent = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return <>{children}</>;
};

export const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => {
  return <option value={value}>{children}</option>;
};