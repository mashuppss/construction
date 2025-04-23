"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="ml-2 p-2 rounded-full border border-custom bg-card hover:bg-primary/10 transition-colors text-primary"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
}
