/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        tealBrand: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E'
        },
        beigeBrand: {
          50: '#faf7f0',
          100: '#f5efe6',
          200: '#f0e7db',
          300: '#ebdfd0',
          400: '#e6d7c5',
          500: '#e1cfba',
          600: '#dcc7af',
          700: '#d7bfa4',
          800: '#d2b799',
          900: '#cdaf8e'
        }
      },
      boxShadow: {
        elevated: '0 12px 30px -10px rgba(20,184,166,.35)'
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        slideDown: 'slideDown .4s ease-out',
        float: 'float 6s ease-in-out infinite',
        fadeIn: 'fadeIn .6s ease-out'
      },
      backgroundImage: {
        'teal-beige': 'radial-gradient(80% 80% at 10% 10%, rgba(20,184,166,.35) 0%, rgba(255,255,255,0) 60%), radial-gradient(80% 80% at 90% 10%, rgba(13,148,136,.25) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #f5efe6 0%, #faf7f0 100%)',
        'teal-beige-dark': 'radial-gradient(80% 80% at 10% 10%, rgba(20,184,166,.15) 0%, rgba(0,0,0,0) 60%), radial-gradient(80% 80% at 90% 10%, rgba(13,148,136,.15) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #0f0b16 0%, #120f1a 100%)'
      }
    },
  },
  plugins: [],
}

