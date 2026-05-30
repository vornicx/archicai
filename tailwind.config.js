/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FAFAF8',
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F5F5F3',
          muted: '#EFEFED',
        },
        ink: {
          DEFAULT: '#0C0C0C',
          muted: '#5C5C5C',
          faint: '#8A8A8A',
        },
        line: {
          DEFAULT: '#EBEBEA',
          strong: '#DADAD8',
        },
        accent: {
          DEFAULT: '#0C0C0C',
          soft: '#F0F0EE',
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        mono: ['Geist Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        page: '1080px',
        prose: '640px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(12, 12, 12, 0.04), 0 12px 40px rgba(12, 12, 12, 0.06)',
        card: '0 1px 3px rgba(12, 12, 12, 0.06)',
      },
      borderRadius: {
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
