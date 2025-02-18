import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        // Custom Theme (Uses your CSS variables)
        customtheme: {
          "primary": "var(--foreground)",
          "secondary": "#ff9800",
          "accent": "#4caf50",
          "neutral": "#333333",
          "base-100": "var(--background)",
          "info": "#2196f3",
          "success": "#4caf50",
          "warning": "#ff9800",
          "error": "#f44336",
        },
      },
      "light",
      "dark",
      "cyberpunk",
      "luxury",
    ],
    darkTheme: "dark", // Default dark theme
  },
} satisfies Config;
