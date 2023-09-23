/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
    colors: {
      surface: '#f5fafc',
      surfaceDark: '#0f1416',
      surfaceC: '#eaeef1',
      surfaceCDark: '#1b2022',
      onSurface: '#171c1e',
      onSurfaceDark: '#dee3e6',
      primary: '#00576f',
      primaryDark: '#3bd2f8',
      onPrimary: '#d9ffff',
      onPrimaryDark: '#003545',
      secondary: '#366371',
      secondaryDark: '#9ecddb',
      onSecondary: '#ffffff',
      onSecondaryDark: '#003441'
    }
  },
  plugins: []
};