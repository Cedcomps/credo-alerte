/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        // background: "hsl(var(--background))",
        // foreground: "hsl(var(--foreground))",
        // btn: {
        //   background: "hsl(var(--btn-background))",
        //   "background-hover": "hsl(var(--btn-background-hover))",
        // },
        // fontFamily: {
        //   sans: ["var(--font-sans)", ...fontFamily.sans],
        // },
      },
    },
  },
  plugins: [],
};
