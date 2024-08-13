/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins Regular', 'Ubuntu', 'sans-serif'],
        'poppins-light': ['Poppins Light', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-medium': ['Poppins Medium', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-bold': ['Poppins Bold', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-extra-light': ['Poppins Extralight', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-thin': ['Poppins Thin', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-semi-bold': ['Poppins Semibold', 'Ubuntu', 'san-serif', 'serif'],
        'poppins-extra-bold': ['Poppins Extrabold', 'Ubuntu', 'san-serif', 'serif']
      },
      colors: {
        'main-color': '#00A2E6',
        'main-color-light': '#00b5e6',
        'main-color-dark': '#0092e6',
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
  daisyui :{
    themes: ['bumblebee', 'dark', 'emerald', 'forest', 'lofi', 'synthwave', 'retro', 'cyberpunk', 'halloween', 'valentine', 'garden', 'forest', 'dracula', 'corporate', 'winter', 'wireframe', 'black'],
  }
}

