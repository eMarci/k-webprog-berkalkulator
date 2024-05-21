import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
    daisyui: {
        themes: [
            {
                mytheme: {

                    "primary": "#2563eb",

                    "secondary": "#0ea5e9",

                    "accent": "#7dd3fc",

                    "neutral": "#d1d5db",

                    "base-100": "#e2e8f0",

                    "info": "#f3f4f6",

                    "success": "#10b981",

                    "warning": "#facc15",

                    "error": "#ef4444",
                },
            },
        ],
    }
}

