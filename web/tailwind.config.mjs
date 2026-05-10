/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Aurora paleti — Üretken YZ Atölyesi
        primary:   '#3730A3',  // indigo (Bölüm 3: Mesleğe Özel · Lokal · API)
        secondary: '#8B5CF6',  // purple (Bölüm 2: İçerik Üretim Atölyeleri)
        accent:    '#10B981',  // emerald (Bölüm 1: Temeller ve Asistanlar)
        cream:     '#F0F9FF',  // sky-tinted bg
        warmBg:    '#EEF2FF',  // indigo-50 (alternating rows)
        cardBg:    '#FFFFFF',
        dark:      '#0F172A',  // slate-900
        mid:       '#475569',  // slate-600
        subtle:    '#94A3B8',  // slate-400
        border:    '#CBD5E1',  // slate-300
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans:  ['Calibri', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
