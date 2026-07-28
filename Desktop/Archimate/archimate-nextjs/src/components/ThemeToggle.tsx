"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun, Droplets } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full border border-gray-200" />; // placeholder
  }

  const themes = [
    { id: "light", icon: Sun, label: "Orange / Light" },
    { id: "dark", icon: Moon, label: "Black" },
    { id: "liquid", icon: Droplets, label: "Liquid White" }
  ];

  const currentThemeIndex = themes.findIndex((t) => t.id === theme);
  const nextTheme = themes[(currentThemeIndex + 1) % themes.length];

  return (
    <button
      onClick={() => setTheme(nextTheme.id)}
      className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2 group relative overflow-hidden"
      title={`Switch to ${nextTheme.label} theme`}
    >
      {theme === "light" && <Sun className="w-5 h-5 text-brand-orange" />}
      {theme === "dark" && <Moon className="w-5 h-5 text-gray-300" />}
      {theme === "liquid" && <Droplets className="w-5 h-5 text-blue-500" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
