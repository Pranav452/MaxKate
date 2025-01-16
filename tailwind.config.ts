import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'vinyl-spin': 'vinyl-rotation 2.5s linear infinite',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'flicker': 'flicker 2s linear infinite',
      },
      keyframes: {
        'vinyl-rotation': {
          '0%': {
            transform: 'rotate(0deg)'
          },
          '100%': {
            transform: 'rotate(360deg)'
          }
        },
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter: 'brightness(1)'
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'brightness(0.8)'
          }
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
