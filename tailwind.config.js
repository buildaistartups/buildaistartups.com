/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enables class-based dark mode!
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors for easy use, you can use these or just Tailwind’s built-ins
        'brand-bg': '#f8fafc', // for bg-slate-50 look
        'brand-purple': '#8247ff', // main CTA purple
        'brand-purple-light': '#ede9fe', // accent
        'brand-header': '#ffffffcc', // header white, 80% opacity
        // Add others if needed
      },
    },
  },
  plugins: [],
}
