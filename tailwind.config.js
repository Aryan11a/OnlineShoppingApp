/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F6F1",
        ink: "#24332D",
        papaya: "#E65B46",
        leaf: "#DDEBDD",
        muted: "#788079",
        night: "#171F1C",
        nightCard: "#232E29",
        nightText: "#F1F1E9",
        nightMuted: "#A5AFA7",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
