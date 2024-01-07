/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontSize: {
      'xs': 'var(--step--2)',
      'sm': 'var(--step--1)',
      'base': 'var(--step-0)',
      'lg': 'var(--step-1)',
      'xl': 'var(--step-2)',
      '2xl': 'var(--step-3)',
      '3xl': 'var(--step-4)',
      '4xl': 'var(--step-5)',
      '5xl': ['var(--step-6)', '1'],
      '6xl': ['var(--step-7)', '1'],
      '7xl': ['var(--step-8)', '1'],
      '8xl': ['var(--step-9)', '1'],
      '9xl': ['var(--step-10)', '1'],
    },
    extend: {
      colors: {
        flame: {
          50: "#F8C8B4",
          100: "#F6BAA2",
          200: "#F5AC8F",
          300: "#F1906A",
          400: "#EE7444",
          500: "#EA591F",
          600: "#CD4813",
          700: "#A83B10",
          800: "#832E0C",
          900: "#5D2109",
          950: "#4B1A07"
        },
        "floral-white": "#FFFCF2",
        timberwolf: "#CCC5B9",
        "black-olive": "#403D39",
        "eerie-black": "#252422",
        "dark-hover": "#4a4742",
        "light-hover": "#f4f1e7"
      },
      spacing: {
        '3xs': 'var(--space-3xs)',
        '2xs': 'var(--space-2xs)',
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-s)',
        'md': 'var(--space-m)',
        'lg': 'var(--space-l)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '3xs-2xs': 'var(--space-3xs-2xs)',
        '2xs-xs': 'var(--space-2xs-xs)',
        'xs-sm': 'var(--space-xs-s)',
        'sm-md': 'var(--space-s-m)',
        'md-lg': 'var(--space-m-l)',
        'lg-xl': 'var(--space-l-xl)',
        'xl-2xl': 'var(--space-xl-2xl)',
        '2xl-3xl': 'var(--space-2xl-3xl)',
        '3xs-xl': 'var(--space-3xs-xl)'
      },
      boxShadow: {
        'low': 'var(--shadow-elevation-low)',
        'medium': 'var(--shadow-elevation-medium)',
        'high': 'var(--shadow-elevation-high)',
        'd-low': 'var(--dark-shadow-elevation-low)',
        'd-medium': 'var(--dark-shadow-elevation-medium)',
        'd-high': 'var(--dark-shadow-elevation-high)',
      },
    }
  },
  plugins: []
};