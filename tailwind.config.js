/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "rgba(var(--color-background), 1)",
        secondaryBackgroundColor: "rgba(var(--color-secondaryBackground), 1)",
        text: "rgba(var(--color-text), 1)",
        primary: "rgba(var(--color-primary), 1)",
        secondary: "rgba(var(--color-secondary), 1)",
        border: "rgba(var(--color-border), 1)",
        button: "rgba(var(--color-button), 1)",
        buttonHover: "rgba(var(--color-button-hover), 1)",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
