/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        greenDark: "#6A883A",
        greenLight: "#D6E5BE",
        bgLight: "#F5F3EF",
        bgGrey: "#D4D7D4",
        violetLight: "#D9CBFF",
        violetDark: "#9A83DA",
        dark: "#0F0F11", // Notez que vous aviez oublié le "#" ici.
      },
    },
  },
  plugins: [],
};
