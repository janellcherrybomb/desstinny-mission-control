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
        pearlWhite: '#F8F6F2',
        softIvory: '#FFFFFF',
        champagne: '#E7DED2',
        softTeal: '#8BC7C3',
        opalAqua: '#B8E6E6',
        seafoamMist: '#D8EFE8',
        iridescentMint: '#CFEFC9',
        roseBronze: '#B68A7A',
        oceanSlate: '#2F3E46',
        mutedText: '#6B7280',
        success: '#7DD3A7',
        warning: '#F6C177',
        error: '#E57373',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1.5s step-end infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'scanline': 'scanline 8s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.85)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(47, 62, 70, 0.06), 0 1px 2px rgba(47, 62, 70, 0.04)',
        'card-hover': '0 4px 12px rgba(47, 62, 70, 0.08), 0 2px 4px rgba(47, 62, 70, 0.04)',
        'glow': '0 0 8px rgba(139, 199, 195, 0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
