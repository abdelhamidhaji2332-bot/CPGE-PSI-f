import type { Config } from "tailwindcss";
export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { bg: "var(--bg)", surface: "var(--surface)", fg: "var(--fg)", muted: "var(--muted)", line: "var(--line)", accent: "var(--accent)" },
    fontFamily: { sans: ["var(--font-ui)", "system-ui"], mono: ["var(--font-mono)", "ui-monospace"] },
  } },
} satisfies Config;
