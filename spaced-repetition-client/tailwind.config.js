/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {

    },
    colors: {
      'primary': {
        50: '#CBDCEF',
        100: '#B4D0EF',
        200: '#9CC4EF',
        300: '#84B8EF',
        400: '#6BB0ED',
        500: '#5298F2',
        600: '#3A8DD8',
        700: '#2977CC',
        800: '#206BBC',
        900: '#1459A5'
      },
      'accent': {
        50: '#EFCD97',
        100: '#EFC47F',
        200: '#EFBB67',
        300: '#EFB250',
        400: '#EDA337',
        500: '#F29F05',
        600: '#DD860A',
        700: '#CE8106',
        800: '#BA730C',
        900: '#AD6D07'
      },
      'warn': {
        50: '#EAB5B8',
        100: '#EA9DA1',
        200: '#EA868B',
        300: '#EA6E75',
        400: '#EA575F',
        500: '#eb3e41',
        600: '#DB2E37',
        700: '#CC1F28',
        800: '#BC131C',
        900: '#9E0B19'
      },
      'success': {
        50: '#8FBCA5',
        100: '#7BBA99',
        200: '#69BC93',
        300: '#57BC89',
        400: '#44BC80',
        500: '#30BF7C',
        600: '#21AA65',
        700: '#1B9E5C',
        800: '#108E4F',
        900: '#07753E'
      }
    },
  },
  plugins: [],
}
