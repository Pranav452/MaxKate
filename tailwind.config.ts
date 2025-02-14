import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
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
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
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
  		animation: {
  			'vinyl-spin': 'vinyl-rotation 2.5s linear infinite',
  			'fade-in-down': 'fadeInDown 0.5s ease-out',
  			'slide-up': 'slideUp 0.3s ease-out forwards',
  			flicker: 'flicker 2s linear infinite',
  			'bird-flight-1': 'bird-flight-1 20s linear infinite',
  			'bird-flight-2': 'bird-flight-2 25s linear infinite',
  			'bird-flight-3': 'bird-flight-3 30s linear infinite',
        'smoke-1': 'smoke-rise-1 8s ease-in-out infinite',
        'smoke-2': 'smoke-rise-2 9s ease-in-out infinite',
        'smoke-3': 'smoke-rise-3 10s ease-in-out infinite',
        'smoke-dissipate': 'smoke-dissipate 4s ease-out infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
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
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(100%)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
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
  			},
  			'bird-flight-1': {
  				'0%': { transform: 'translate(0, 0) rotate(12deg)' },
  				'50%': { transform: 'translate(90vw, -20vh) rotate(12deg)' },
  				'50.001%': { transform: 'translate(-10vw, 10vh) rotate(12deg)' },
  				'100%': { transform: 'translate(0, 0) rotate(12deg)' },
  			},
  			'bird-flight-2': {
  				'0%': { transform: 'translate(0, 0) rotate(-12deg)' },
  				'50%': { transform: 'translate(-90vw, -15vh) rotate(-12deg)' },
  				'50.001%': { transform: 'translate(10vw, 15vh) rotate(-12deg)' },
  				'100%': { transform: 'translate(0, 0) rotate(-12deg)' },
  			},
  			'bird-flight-3': {
  				'0%': { transform: 'translate(0, 0) rotate(6deg)' },
  				'50%': { transform: 'translate(70vw, -25vh) rotate(6deg)' },
  				'50.001%': { transform: 'translate(-20vw, 5vh) rotate(6deg)' },
  				'100%': { transform: 'translate(0, 0) rotate(6deg)' },
  			},
        'smoke-rise-1': {
          '0%': { 
            transform: 'translateY(100%) scale(1)',
            opacity: '0.4'
          },
          '50%': { 
            transform: 'translateY(40%) scale(1.4) translateX(-10%)',
            opacity: '0.2'
          },
          '100%': { 
            transform: 'translateY(-20%) scale(1.8) translateX(-20%)',
            opacity: '0'
          }
        },
        'smoke-rise-2': {
          '0%': { 
            transform: 'translateY(100%) scale(1)',
            opacity: '0.4'
          },
          '50%': { 
            transform: 'translateY(40%) scale(1.6) translateX(10%)',
            opacity: '0.2'
          },
          '100%': { 
            transform: 'translateY(-20%) scale(2) translateX(20%)',
            opacity: '0'
          }
        },
        'smoke-rise-3': {
          '0%': { 
            transform: 'translateY(100%) scale(1)',
            opacity: '0.3'
          },
          '50%': { 
            transform: 'translateY(50%) scale(1.2)',
            opacity: '0.15'
          },
          '100%': { 
            transform: 'translateY(-10%) scale(1.6)',
            opacity: '0'
          }
        },
        'smoke-dissipate': {
          '0%': { 
            filter: 'blur(5px)',
            opacity: '0.4'
          },
          '100%': { 
            filter: 'blur(15px)',
            opacity: '0'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic':
  				'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  		},
  		fontFamily: {
  			'captain': ['Captain America', 'sans-serif'],
  			'campus': ['Campus', 'sans-serif'],
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
