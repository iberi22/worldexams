/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0a0f',
        'bg-card': '#12121a',
        'text-primary': '#F5F5DC',
        'text-secondary': '#8a8a9a',
        'accent-cyan': '#00FFFF',
        'accent-gold': '#FCD116',
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
