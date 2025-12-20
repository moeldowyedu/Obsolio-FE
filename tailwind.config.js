/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					'50': '#F0FDFA',
					'100': '#CCFBF1',
					'200': '#99F6E4',
					'300': '#5EEAD4',
					'400': '#2DD4BF',
					'500': '#14B8A6',
					'600': '#0D9488',
					'700': '#0F766E',
					'800': '#115E59',
					'900': '#134E4A',
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					'50': '#f8fafc',
					'100': '#f1f5f9',
					'200': '#e2e8f0',
					'300': '#cbd5e1',
					'400': '#94a3b8',
					'500': '#64748b',
					'600': '#475569',
					'700': '#334155',
					'800': '#1e293b',
					'900': '#0f172a',
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				accent: {
					purple: {
						'50': '#faf5ff',
						'100': '#f3e8ff',
						'200': '#e9d5ff',
						'300': '#d8b4fe',
						'400': '#c084fc',
						'500': '#a855f7',
						'600': '#9333ea',
						'700': '#7e22ce',
						'800': '#6b21a8',
						'900': '#581c87'
					},
					teal: {
						'50': '#f0fdfa',
						'100': '#ccfbf1',
						'200': '#99f6e4',
						'300': '#5eead4',
						'400': '#2dd4bf',
						'500': '#14b8a6',
						'600': '#0d9488',
						'700': '#0f766e',
						'800': '#115e59',
						'900': '#134e4a'
					},
					amber: {
						'50': '#fffbeb',
						'100': '#fef3c7',
						'200': '#fde68a',
						'300': '#fcd34d',
						'400': '#fbbf24',
						'500': '#f59e0b',
						'600': '#d97706',
						'700': '#b45309',
						'800': '#92400e',
						'900': '#78350f'
					},
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				glass: {
					white: 'rgba(255, 255, 255, 0.1)',
					border: 'rgba(255, 255, 255, 0.2)'
				},
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontFamily: {
				heading: [
					'Outfit',
					'Inter',
					'sans-serif'
				],
				body: [
					'Outfit',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'sans-serif'
				],
				sans: [
					'Outfit',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'sans-serif'
				],
				mono: [
					'JetBrains Mono',
					'Consolas',
					'monospace'
				],
				arabic: [
					'Tajawal',
					'sans-serif'
				]
			},
			backdropBlur: {
				xs: '2px'
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.4s ease-out',
				'slide-down': 'slideDown 0.4s ease-out',
				'scale-in': 'scaleIn 0.3s ease-out',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			},
			keyframes: {
				fadeIn: {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				slideUp: {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				slideDown: {
					'0%': {
						transform: 'translateY(-20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				scaleIn: {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [
		// require("tailwindcss-animate"), // TODO: Run 'npm install' to install this package
	],
}
