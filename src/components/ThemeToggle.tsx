"use client";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark; setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };
  return (
    <button onClick={toggle} aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-surface">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
