import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                },
                // Lighter MRT IITB Color Palette
                mars: {
                    DEFAULT: '#EF4444', // Keep the bright red
                    dark: '#DC2626',    
                    light: '#F87171',  
                    50: '#FEF2F2',
                    100: '#FEE2E2',
                    200: '#FECACA',
                    300: '#FCA5A5',
                    400: '#F87171',
                    500: '#EF4444',
                    600: '#DC2626',
                    700: '#B91C1C',
                    800: '#991B1B',
                    900: '#7F1D1D'
                },
                space: {
                    DEFAULT: '#1F2937',   // Much lighter than before (#0F1419)
                    dark: '#111827',      // Lighter than pure black
                    light: '#374151',    // Even lighter
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',      // Main background
                    900: '#111827',      // Dark variant
                    950: '#0C1015'       // Darkest
                },
                cosmic: {
                    DEFAULT: '#06B6D4',   
                    dark: '#0891B2',     
                    light: '#22D3EE',   
                    50: '#ECFEFF',
                    100: '#CFFAFE',
                    200: '#A5F3FC',
                    300: '#67E8F9',
                    400: '#22D3EE',
                    500: '#06B6D4',
                    600: '#0891B2',
                    700: '#0E7490',
                    800: '#155E75',
                    900: '#164E63'
                },
                // Enhanced light variants
                'space-light': {
                    DEFAULT: 'rgba(255, 255, 255, 0.15)', // More visible
                    10: 'rgba(255, 255, 255, 0.08)',
                    20: 'rgba(255, 255, 255, 0.15)',
                    30: 'rgba(255, 255, 255, 0.25)',     // Much more visible
                    40: 'rgba(255, 255, 255, 0.35)'      // Very visible
                },
                // Slate variants for better readability
                slate: {
                    DEFAULT: '#64748B',
                    50: '#F8FAFC',
                    100: '#F1F5F9',
                    200: '#E2E8F0',
                    300: '#CBD5E1',
                    400: '#94A3B8',
                    500: '#64748B',
                    600: '#475569',
                    700: '#334155',
                    800: '#1E293B',      // Good for cards
                    900: '#0F172A'
                },
                orange: {
                    DEFAULT: '#F97316',
                    dark: '#EA580C',
                    light: '#FB923C',
                    50: '#FFF7ED',
                    100: '#FFEDD5',
                    200: '#FED7AA',
                    300: '#FDBA74',
                    400: '#FB923C',
                    500: '#F97316',
                    600: '#EA580C',
                    700: '#C2410C',
                    800: '#9A3412',
                    900: '#7C2D12'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' }
                },
                'glow': {
                    '0%, 100%': { 
                        boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' 
                    },
                    '50%': { 
                        boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' 
                    }
                },
                'slide-up': {
                    '0%': { 
                        transform: 'translateY(100px)',
                        opacity: '0'
                    },
                    '100%': { 
                        transform: 'translateY(0)',
                        opacity: '1'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
                'glow': 'glow 3s ease-in-out infinite',
                'slide-up': 'slide-up 0.8s ease-out'
            },
            fontFamily: {
                'space': ['Space Grotesk', 'sans-serif'],
                'technospace': ['Orbitron', 'sans-serif'],
                'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace']
            },
            backgroundImage: {
                'mars-gradient': 'linear-gradient(135deg, #EF4444 0%, #F97316 50%, #EF4444 100%)',
                'cosmic-gradient': 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 50%, #06B6D4 100%)',
                'hero-pattern': 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, rgba(239, 68, 68, 0.05) 50%, rgba(31, 41, 55, 0.05) 100%)',
                'space-pattern': 'radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)',
                'grid-pattern': 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)'
            },
            backdropBlur: {
                xs: '2px'
            },
            boxShadow: {
                'mars': '0 10px 40px rgba(239, 68, 68, 0.3)',
                'cosmic': '0 10px 40px rgba(6, 182, 212, 0.3)',
                'glow-red': '0 0 20px rgba(239, 68, 68, 0.5)',
                'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)'
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
