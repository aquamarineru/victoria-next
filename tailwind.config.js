/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        light: "#F5f5f7",
        gray: "rgba(217, 217, 217, 0.35)", 
        hover: "#16f2dc",   
        basic: '#342359'
      },
      backgroundImage: {
        'glass': "linear-gradient(113.9deg,hsla(0,0%,100%,.02) 17.93%,hsla(0,0%,100%,.04) 44.28%,hsla(0,0%,100%,.04) 63.93%,hsla(0,0%,100%,.02) 88.25%)"
      },
      
      fontFamily: {
        text: ['Montserrat', 'sans-serif'],
        title: ['Bitter', 'sans-serif']
      },
      boxShadow: {
        custom: "0 -1px 4px rgba(0, 0, 0, 0.15)",
      },

    },
  },
  plugins: [],
}
