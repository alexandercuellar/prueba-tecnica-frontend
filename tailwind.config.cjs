module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#002045",
        "primary-fixed": "#d6e3ff",
        "primary-container": "#1a365d",
        secondary: "#545f72",
        surface: "#f7fafc",
        "surface-container-highest": "#e0e3e5",
        "surface-container-lowest": "#ffffff",
        outline: "#74777f",
        "on-primary": "#ffffff",
        "on-primary-container": "#86a0cd",
        "on-secondary-container": "#586377",
        "on-surface": "#181c1e",
      },
      fontFamily: {
        headline: ["Manrope"],
        body: ["Inter"],
        label: ["Inter"],
      },
    },
  },
  plugins: [],
};
