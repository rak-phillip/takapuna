/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'tk-color': 'var(--tk-color)',
        'tk-background-color': 'var(--tk-background-color)',
        'tk-button-foreground': 'var(--tk-button-foreground)',
        'tk-button-background': 'var(--tk-button-background)',
        'tk-button-hoverBackground': 'var(--tk-button-hoverBackground)',
        'tk-focusBorder': 'var(--tk-focusBorder)',
        'tk-button-secondaryForeground': 'var(--tk-button-secondaryForeground)',
        'tk-button-secondaryBackground': 'var(--tk-button-secondaryBackground)',
        'tk-button-secondaryHoverBackground': 'var(--tk-button-secondaryHoverBackground)',
      },
    },
  },
  plugins: [],
}
