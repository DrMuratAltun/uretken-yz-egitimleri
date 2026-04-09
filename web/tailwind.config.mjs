/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary:   '#5B2C1E',
        secondary: '#C97B5A',
        accent:    '#2B7A78',
        cream:     '#FFF9F3',
        warmBg:    '#FEF5EE',
        cardBg:    '#FFFFFF',
        dark:      '#2E1F1A',
        mid:       '#6B5B52',
        subtle:    '#A39585',
        border:    '#E8DDD3',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans:  ['Calibri', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
