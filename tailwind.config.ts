import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sw: {
          // Primary Colors
          white: "var(--color-sw-white)",

          // Midnight Scale
          midnight: {
            100: "var(--color-sw-midnight-100)",
            200: "var(--color-sw-midnight-200)",
            300: "var(--color-sw-midnight-300)",
            400: "var(--color-sw-midnight-400)",
            500: "var(--color-sw-midnight-500)",
            600: "var(--color-sw-midnight-600)",
            700: "var(--color-sw-midnight-700)",
            800: "var(--color-sw-midnight-800)",
          },

          // Green Scale (Action Color)
          green: {
            100: "var(--color-sw-green-100)",
            300: "var(--color-sw-green-300)",
            500: "var(--color-sw-green-500)",
            700: "var(--color-sw-green-700)",
            900: "var(--color-sw-green-900)",
          },

          // Violet Scale (Secondary Logic)
          violet: {
            100: "var(--color-sw-violet-100)",
            300: "var(--color-sw-violet-300)",
            500: "var(--color-sw-violet-500)",
            700: "var(--color-sw-violet-700)",
            900: "var(--color-sw-violet-900)",
          },

          // Neutral Scale
          neutral: {
            200: "var(--color-sw-neutral-200)",
            300: "var(--color-sw-neutral-300)",
            400: "var(--color-sw-neutral-400)",
            500: "var(--color-sw-neutral-500)",
            700: "var(--color-sw-neutral-700)",
            800: "var(--color-sw-neutral-800)",
            900: "var(--color-sw-neutral-900)",
          },
        },
      },
      fontFamily: {
        heading: "var(--font-heading)",
        body: "var(--font-body)",
        mono: "var(--font-mono)",
      },
      fontSize: {
        // Brand Typography Scale
        "h1": ["56px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "h2": ["40px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        "h3": ["32px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lead": ["24px", { lineHeight: "1.5", fontWeight: "300" }],
        "body-primary": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-base": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "body-compact": ["14px", { lineHeight: "1.4", fontWeight: "400" }],
        "label": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "700" }],
        "meta": ["12px", { lineHeight: "1.3", letterSpacing: "0.02em", fontWeight: "600" }],
        "btn": ["14px", { lineHeight: "1", letterSpacing: "0.02em", fontWeight: "700" }],
        "nav": ["16px", { lineHeight: "1", fontWeight: "600" }],
      },
      spacing: {
        // Grid system spacing
        "gutter-desktop": "24px",
        "gutter-mobile": "4px",
      },
      maxWidth: {
        // Desktop grid width
        "grid-desktop": "1440px",
        "grid-mobile": "375px",
      },
      gridTemplateColumns: {
        // 12-column desktop grid
        "desktop": "repeat(12, 98px)",
        // 4-column mobile grid
        "mobile": "repeat(4, 85px)",
      },
      boxShadow: {
        // Brand shadow styles
        "card": "0 1px 3px rgba(28, 30, 49, 0.06)",
        "card-hover": "0 8px 24px rgba(28, 30, 49, 0.12)",
        "nav": "0 2px 8px rgba(28, 30, 49, 0.15)",
        "btn-green": "0 4px 12px rgba(191, 233, 55, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
