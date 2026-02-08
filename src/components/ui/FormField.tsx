import React from "react";

type Props = {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

export default function FormField({ label, required, error, children }: Props) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-800">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {children}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
