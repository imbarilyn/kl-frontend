/** @type {import('tailwindcss').Config} */
const { blackA, grass, green } = require('@radix-ui/colors')
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
      'AF-50': '#eef8ff',
      'AF-100': '#dcf1ff',
      'AF-200': '#b2e4ff',
      'AF-300': '#6dd0ff',
      'AF-400': '#20b8ff',
      'AF-500': '#20b8ff',
      'AF-600': '#20b8ff',
      'AF-700': '#0064b4',
      'AF-800': '#005594',
      'AF-900': '#004172',
      'AF-950': '#002c51',

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

