"use client";

import React, { useEffect, useState } from "react";
import { Moon, Sun, Palette, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  { id: "light", icon: Sun, label: "Matcha", color: "#A3FF47" },
  { id: "dark", icon: Moon, label: "Midnight", color: "#0F172A" },
  { id: "mango", icon: Palette, label: "Mango", color: "#FBBF24" },
  { id: "taro", icon: Leaf, label: "Taro", color: "#d8b4fe" },
];

export default function ThemeToggle() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleStorage = () => {
      const savedTheme = localStorage.getItem("theme") || "light";
      setCurrentTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    };

    handleStorage();
  }, []);

  const toggleTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("theme", themeId);
    setIsOpen(false);
  };

  const CurrentIcon = themes.find(t => t.id === currentTheme)?.icon || Sun;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 flex items-center justify-center bg-background border-2 border-foreground brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all focus:outline-none"
        aria-label="Changer le thème"
      >
        <CurrentIcon size={20} className="text-foreground" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute right-0 top-full mt-4 p-2 bg-background border-2 border-foreground brutalist-shadow-sm flex flex-col gap-2 z-[100] min-w-[140px]"
          >
            {themes.map((theme) => {
              return (
                <button
                  key={theme.id}
                  onClick={() => toggleTheme(theme.id)}
                  className={`flex items-center gap-3 px-3 py-2 w-full text-left transition-colors hover:bg-muted ${
                    currentTheme === theme.id ? "bg-primary/20 font-black" : ""
                  }`}
                >
                  <div 
                    className="w-4 h-4 rounded-full border border-foreground" 
                    style={{ backgroundColor: theme.color }}
                  />
                  <span className="font-display text-lg uppercase leading-none tracking-tight">
                    {theme.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
