import * as React from "react";

export const Select = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props}>{children}</select>
);

export const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SelectValue = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const SelectItem = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => <option value={value}>{children}</option>;
