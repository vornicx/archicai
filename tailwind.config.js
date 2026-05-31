/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        surface: '#0A0A0A',
        border: '#161616',
        text: {
          DEFAULT: '#FFFFFF',
          muted: '#8A8A8A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        page: '1100px',
      },
      borderRadius: {
        card: '6px',
      },
    },
  },
  plugins: [],
}
