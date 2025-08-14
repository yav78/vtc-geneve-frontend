/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        violetBrand: {
          50: '#FBF6FE',
          100: '#F4EAFD',
          200: '#ECD9FB',
          300: '#DDBBF7',
          400: '#C890F0',
          500: '#B265E7',
          600: '#9D45D8',
          700: '#8833BD',
          800: '#732E9B',
          900: '#4E2068',
          950: '#40105B'
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
        elevated: '0 12px 30px -10px rgba(157,69,216,.35)'
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
        'violet-beige': 'radial-gradient(80% 80% at 10% 10%, rgba(200,144,240,.35) 0%, rgba(255,255,255,0) 60%), radial-gradient(80% 80% at 90% 10%, rgba(157,69,216,.25) 0%, rgba(255,255,255,0) 60%), linear-gradient(180deg, #f5efe6 0%, #faf7f0 100%)',
        'violet-beige-dark': 'radial-gradient(80% 80% at 10% 10%, rgba(200,144,240,.15) 0%, rgba(0,0,0,0) 60%), radial-gradient(80% 80% at 90% 10%, rgba(157,69,216,.15) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #0f0b16 0%, #120f1a 100%)'
      }
    },
  },
  plugins: [],
}

