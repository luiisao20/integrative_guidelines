/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    './index.html', './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      'background': '#EEE8E8',
      'main-lighter': '#283C8C',
      'main-default': '#10267F',
      'light': '#348DCC',
      'danger': '#ED3B53',
      'success': '#3A865E'
    }
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}

