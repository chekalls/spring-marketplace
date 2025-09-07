module.exports = {
  content: ['./dist/**/*.html', './src/**/*.{js,jsx,ts,tsx}', './*.html'],
  plugins: [require('@tailwindcss/forms')],
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  theme: {
    extend: {
      colors: {
        primary: '#dc2626',     // red-600
        secondary: '#ea580c',   // orange-600
        accent: '#b91c1c',      // red-700
        light: '#fef2f2',       // red-50
        dark: '#1f2937',        // gray-800
        gray: '#6b7280',        // gray-500
      }
    }
  }
}
