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
        }
      },
    },
  },
  plugins: [],
};