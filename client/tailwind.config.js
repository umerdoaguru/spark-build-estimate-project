// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       screens: {
//         's':'200p',
//         'xs': '480p',      // Extra small screens, like very small phones
//         'sm': '640px',      // Small screens (phones)
//         'md': '768px',      // Medium screens (tablets)
//         'lg': '1024px',     // Large screens (laptops)
//         'xl': '1280px',     // Extra large screens (desktops)
//         '2xl': '1536px',    // 2x extra large screens
//         '3xl': '1920px',    // Custom extra large screens (e.g., 4K displays)
//       },
//       fontFamily: {
//         sans: ['ui-sans-serif', 'system-ui', 'Roboto', 'Arial', 'sans-serif'], // Add your preferred fallback fonts here
//       },
//     },
//   },
//   plugins: [],
// } 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        's': '200px',
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Roboto', 'Arial', 'sans-serif'],
      },
      keyframes: {
    pulseGlow: {
      '0%, 100%': { opacity: '1', transform: 'scale(1)' },
      '50%': { opacity: '0.6', transform: 'scale(1.1)' },
    },
  },
  animation: {
    pulseGlow: 'pulseGlow 5s ease-in-out infinite',
  },
    },
  },
  plugins: [],
}


