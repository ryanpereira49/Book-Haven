/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.jsx',
    './src/components/**/*.jsx'
  ],
  theme: {
    extend: {
      colors:{
        'black': '#333A3F'
      },
      fontFamily:{
        'sans': ['Inter']
      }
    }
  },
  plugins: [],
  mode: 'jit'
}

