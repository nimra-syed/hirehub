import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const base =
  "w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 caret-black transition shadow-sm" +
  "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1";

export default function Input({ className = "", error, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={`${base} ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-black"
        } ${className}`}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
