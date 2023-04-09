const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'dark-theme': '#1f1f1f',
        'black-olive': '#3f3f3f',
        'eerie-black': '#181818',
        'bright-gray': '#ECECF1',
        'green-crayola': '#10A37F',
        'green-ufo': '#22C55E',
        'sonic-silver': '#6E6E80',
        onyx: '#353740',
        'onyx-shade': '#c2c3c6'
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans]
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1.02)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      animation: {
        scale: 'scale 0.2s ease-out'
      },
      boxShadow: {
        chat: '0px 0px 10px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@formkit/themes/tailwindcss')]
}
