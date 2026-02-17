"use client";

import { motion } from "motion/react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "light";
  size?: "default" | "large";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const base =
    "group relative overflow-hidden inline-flex items-center justify-center font-medium tracking-[0.08em] uppercase transition-colors cursor-pointer";

  const sizes = {
    default: "px-8 py-3.5 text-xs",
    large: "px-10 py-4.5 text-sm",
  };

  const variants = {
    primary: "border border-black text-black hover:text-white",
    outline: "border border-steel-40 text-black hover:text-white",
    light: "border border-white/30 text-white hover:text-black",
  };

  const maskBg = {
    primary: "bg-black",
    outline: "bg-black",
    light: "bg-white",
  };

  return (
    <motion.button
      type={type}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className={`btn-mask absolute inset-0 ${maskBg[variant]}`}
        aria-hidden
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path
            d="M1 7h12M8 2l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </motion.button>
  );
}
