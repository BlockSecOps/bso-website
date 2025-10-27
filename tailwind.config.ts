import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        electric: {
          50: '#E6F9FF',
          100: '#CCF3FF',
          200: '#99E7FF',
          300: '#66DBFF',
          400: '#33D0FF',
          500: '#00D4FF', // Main
          600: '#00A8CC',
          700: '#007B99',
          800: '#005366',
          900: '#002B33',
        },
        purple: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6', // Main
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        cyan: {
          neon: '#00FFF0',
        },
        // Aliased colors for easier use
        primary: {
          50: '#E6F9FF',
          100: '#CCF3FF',
          200: '#99E7FF',
          300: '#66DBFF',
          400: '#33D0FF',
          500: '#00D4FF',
          600: '#00A8CC',
          700: '#007B99',
          800: '#005366',
          900: '#002B33',
        },
        accent: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        // Backgrounds
        dark: {
          50: '#4B5563',
          100: '#374151',
          200: '#2A2D50',
          300: '#1A1B3D',
          400: '#0A0E27',
          500: '#050711',
        },
        // Semantic
        success: '#00FF88',
        warning: '#FF8A00',
        error: '#FF3366',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '5xl': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #0A0E27 0%, #1A1B3D 100%)',
        'gradient-purple': 'linear-gradient(135deg, #1A1B3D 0%, #2D1B4E 100%)',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #8B5CF6 0px, transparent 50%), radial-gradient(at 80% 0%, #00D4FF 0px, transparent 50%), radial-gradient(at 0% 50%, #6366F1 0px, transparent 50%)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
        'glow': '0 0 60px rgba(0, 212, 255, 0.4)',
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
