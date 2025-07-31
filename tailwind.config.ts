import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx,js,jsx}",
        "./components/**/*.{ts,tsx,js,jsx}",
        "./app/**/*.{ts,tsx,js,jsx}",
        "./src/**/*.{ts,tsx,js,jsx}",
    ],
      theme: {
    extend: {
      // Mars Explorer Color Palette
      colors: {
        // Primary Space Colors
        'space-dark': '#0B0D17',    // Deep space black
        'space': '#1A1D2E',         // Dark space blue
        'space-light': '#2A2D3E',   // Lighter space blue
        
        // Mars Colors
        'mars': '#FF6B35',          // Mars orange/red
        'mars-light': '#FF8A65',    // Light mars
        'mars-dark': '#E64A19',     // Dark mars
        
        // Cosmic/Tech Colors
        'cosmic': '#40E0FF',        // Bright cosmic blue
        'cosmic-light': '#7DD3FC',  // Light cosmic
        'cosmic-dark': '#0EA5E9',   // Dark cosmic
        
        // Accent Colors
        'nebula': '#9C27B0',        // Purple nebula
        'stellar': '#FFD700',       // Golden stellar
        'void': '#000000',          // Pure void
        
        // Neutral Grays (Space-themed)
        'gray': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        
        // Enhanced UI Colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        'chart-1': 'hsl(var(--chart-1))',
        'chart-2': 'hsl(var(--chart-2))',
        'chart-3': 'hsl(var(--chart-3))',
        'chart-4': 'hsl(var(--chart-4))',
        'chart-5': 'hsl(var(--chart-5))',
      },
      
      // Custom Font Families
      fontFamily: {
        'inter': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'orbitron': ['var(--font-orbitron)', 'monospace'],
        'space-mono': ['var(--font-space-mono)', 'monospace'],
        'technospace': ['var(--font-orbitron)', 'monospace'], // Alias for backwards compatibility
      },
      
      // Enhanced Animations
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'float-slow': 'float 8s ease-in-out infinite 1s',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'grid-move': 'gridMove 20s linear infinite',
      },
      
      // Custom Keyframes
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-30px) rotate(120deg)' },
          '66%': { transform: 'translateY(-15px) rotate(240deg)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(64, 224, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.8)' },
        },
        gridMove: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(100px, 100px)' },
        },
      },
      
      // Enhanced Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Custom Border Radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      
      // Enhanced Shadows
      boxShadow: {
        'mars': '0 10px 25px rgba(255, 107, 53, 0.3)',
        'cosmic': '0 10px 25px rgba(64, 224, 255, 0.3)',
        'nebula': '0 10px 25px rgba(156, 39, 176, 0.3)',
        'glow-mars': '0 0 20px rgba(255, 107, 53, 0.6)',
        'glow-cosmic': '0 0 20px rgba(64, 224, 255, 0.6)',
        'inner-glow': 'inset 0 2px 4px rgba(255, 255, 255, 0.1)',
      },
      
      // Custom Backdrop Blur
      backdropBlur: {
        'xs': '2px',
      },
      
      // Animation Delays
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
        '1500': '1500ms',
        '2000': '2000ms',
        '2500': '2500ms',
        '3000': '3000ms',
        '3500': '3500ms',
        '4000': '4000ms',
      },
    },
  },

    plugins: [require("tailwindcss-animate")],
} satisfies Config;
