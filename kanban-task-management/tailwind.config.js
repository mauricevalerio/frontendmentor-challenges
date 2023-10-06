/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    colors: {
      'primary': '#635FC7',
      'primary-hover': '#A8A4FF',
      'secondary': '#E4EBFA',
      'secondary-hover': 'rgba(99, 95, 199, 0.25)',
      'destructive': '#EA5555',
      'destructive-hover': '#FF9898',
      'light-bg': '#F4F7FD',
      'light': '#000112',
      'secondary-light': '#828FA3',
      'white': '#fff',
      'dark-bg': '#2b2c37',
      'very-dark-bg': '#20212c'
    },
    letterSpacing: {
      'widest': '0.5em',
    },
    fontSize: {
      'sm': '.75rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.5rem',
    },
    backgroundImage: {
      'gradient-dark': 'linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.13) 100%)',
      'gradient-light': 'linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.50) 100%)'
    }
  },
  plugins: [],
}