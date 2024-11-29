/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    borderRadius: {
      '50': '50%',
      'small': '5px',
      '15': '15px',
      '10': '10px',
    },
    colors: {
      'main': '#4B70F5',
      'nameSchool': '#4A3BCD',
      'hover': '#4C3BCF',
      'while': '#fff',
      'transparent': 'transparent',
      'dark': '#383838',
      'grey': '#ccc',
      'antiquewhite': '#faebd7',
    },
    width: {
      '90': '90%',
      '95': '95%',
      '75%': '75%',
      '80': '80%',
      '25%': '25%',
      '50%': '50%',
      '300': '300px',
      '200': '200px',
      '100%': '100%',
    },
    height: {
      '100': '100%',
    },
    margin: {
      '5%': '5%',
      '2.5%': '2.5%',
      '10%': '10%',
    },
    screens: {
      'sm': '414px',
      'xl': '768px',
      'xxl': '1024px',
    },
    extend: {},
    backgroundImage: {
      'custom-gradient': 'linear-gradient(106.37deg, #ffe1bc 29.63%, #ffcfd1 51.55%, #f3c6f1 90.85%)',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [],
}

