/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'glass': "linear-gradient(113.9deg,hsla(0,0%,100%,.02) 17.93%,hsla(0,0%,100%,.04) 44.28%,hsla(0,0%,100%,.04) 63.93%,hsla(0,0%,100%,.02) 88.25%)"
      },
      fontFamily: {
        title: ['Montserrat', 'sans-serif'],
        text: ['Inter', 'sans-serif']
      },
      boxShadow: {
        custom: "0 -1px 4px rgba(0, 0, 0, 0.15)",
      },
      colors: {
        dark: "#090909",
        light: "#f5f5f5",
        hover: "#DBE2E8",
      },

    },
  },
  plugins: [],
}
