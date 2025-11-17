/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBackground: "#FAF9F5", // bg-mainBackground
        textPrimary: "#6B7280", // tailwind default gray-600
        textSecondary: "#D97757", // text-textSecondary
        textThird: "#E2B09F", // text-textThird
        teal500: "#14b8a6",
        teal600: "#0d9488",
        teal700: "#0f766e",
        teal800: "#115e59",
        teal900: "#134e4a",
      },
    },
  },
  plugins: [],
};
