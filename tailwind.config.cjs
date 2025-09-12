/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
      colors: {
        'igive': {
          'primary': '#B47C3C',
          'background': '#FEF4E9',
          'button': '#F3D7B6',
          'text': '#222222',
          'heading': '#222222',
        },
        'larvik': {
          'primary': '#2B5797',
          'dark': '#1e3a5f',
          'light': '#4A7BA7',
          'black': '#222222',
          'gray': '#333333',
          'white': '#FFFFFF'
        }
      },
    },
  },
  plugins: [],
};