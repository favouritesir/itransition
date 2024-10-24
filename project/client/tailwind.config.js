/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#22d3ee", // Main cyan color
          DEFAULT: "#0ea5e9", // Slightly darker cyan for better readability (Cyan 500)
          dark: "#0284c7", // Dark cyan for dark mode (Cyan 600)
        },
        secondary: {
          light: "#38bdf8", // Supporting light blue for secondary actions (Blue 400)
          DEFAULT: "#0284c7", // Muted blue for secondary actions (Blue 600)
          dark: "#0369a1", // Dark blue for secondary in dark mode (Blue 700)
        },
        accent: {
          light: "#fbbf24", // Warm amber accent for contrast (Amber 400)
          DEFAULT: "#f59e0b", // Amber for default accents (Amber 500)
          dark: "#d97706", // Darker amber for dark mode (Amber 600)
        },
        neutral: {
          light: "#f8fafc", // Very light gray for backgrounds (Neutral 100)
          DEFAULT: "#e2e8f0", // Neutral gray background (Neutral 300)
          dark: "#1e293b", // Dark neutral background (Neutral 800)
        },
        text: {
          light: "#1e293b", // Dark gray text for light mode (Neutral 800)
          DEFAULT: "#0f172a", // Default dark text for maximum readability (Neutral 900)
          dark: "#e2e8f0", // Light gray text for dark mode (Neutral 200)
        },
        // Add colors for error, success, and warning states
        error: {
          light: "#fca5a5", // Light red for error highlights
          DEFAULT: "#ef4444", // Red for error (Red 500)
          dark: "#b91c1c", // Darker red for dark mode (Red 700)
        },
        success: {
          light: "#bbf7d0", // Light green for success highlights
          DEFAULT: "#22c55e", // Green for success (Green 500)
          dark: "#15803d", // Darker green for dark mode (Green 700)
        },
        warning: {
          light: "#fde68a", // Light yellow for warnings
          DEFAULT: "#f59e0b", // Amber for warnings (Amber 500)
          dark: "#b45309", // Darker amber for warnings in dark mode (Amber 700)
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#22d3ee", // Cyan for primary actions
          "primary-focus": "#0ea5e9", // Slightly darker cyan for focus
          "primary-content": "#ffffff", // White text on primary background

          secondary: "#0284c7", // Muted blue for secondary actions
          "secondary-focus": "#0369a1", // Darker blue for focus
          "secondary-content": "#ffffff", // White text on secondary background

          accent: "#f59e0b", // Amber accent for highlights
          "accent-focus": "#d97706", // Darker amber for focus
          "accent-content": "#ffffff", // White text on accent background

          neutral: "#e2e8f0", // Light neutral background
          "neutral-focus": "#cbd5e1", // Slightly darker neutral for borders
          "neutral-content": "#1e293b", // Dark gray text on neutral backgrounds

          error: "#ef4444", // Red for errors
          "error-focus": "#dc2626", // Darker red for focused errors
          "error-content": "#ffffff", // White text on error background

          success: "#22c55e", // Green for success messages
          "success-focus": "#16a34a", // Darker green for focus
          "success-content": "#ffffff", // White text on success background

          warning: "#f59e0b", // Amber for warnings
          "warning-focus": "#d97706", // Darker amber for warning focus
          "warning-content": "#ffffff", // White text on warning background

          "base-100": "#f8fafc", // Light background (almost white)
          "base-200": "#e2e8f0", // Light gray for contrast
          "base-300": "#cbd5e1", // Slightly darker gray for borders
          "base-content": "#1e293b", // Dark gray text
        },
        dark: {
          primary: "#0284c7", // Darker cyan for dark mode
          "primary-focus": "#0369a1", // Focused cyan shade for dark mode
          "primary-content": "#ffffff", // White text on primary

          secondary: "#0369a1", // Dark blue secondary
          "secondary-focus": "#075985", // Even darker blue for focus
          "secondary-content": "#ffffff", // White text on secondary

          accent: "#d97706", // Dark amber for dark mode accents
          "accent-focus": "#b45309", // Even darker amber
          "accent-content": "#ffffff", // White text on accent

          neutral: "#1e293b", // Dark gray neutral background
          "neutral-focus": "#334155", // Slightly lighter gray for borders
          "neutral-content": "#e2e8f0", // Light gray text

          error: "#b91c1c", // Dark red for errors in dark mode
          "error-focus": "#991b1b", // Even darker red for focused errors
          "error-content": "#ffffff", // White text on error background

          success: "#15803d", // Dark green for success in dark mode
          "success-focus": "#166534", // Even darker green for focus
          "success-content": "#ffffff", // White text on success background

          warning: "#b45309", // Dark amber for warnings in dark mode
          "warning-focus": "#92400e", // Even darker amber for focus
          "warning-content": "#ffffff", // White text on warning background

          "base-100": "#0f172a", // Very dark background
          "base-200": "#1e293b", // Dark gray for contrast
          "base-300": "#334155", // Borders and small elements
          "base-content": "#e2e8f0", // Light text on dark backgrounds
        },
      },
    ],
  },
};
