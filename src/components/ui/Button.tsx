"use client";

import * as React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
};

const base =
  "inline-flex items-center justify-center rounded-lg font-medium transition " +
  "focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ghost: "bg-transparent hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
