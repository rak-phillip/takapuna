/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      'body': 'var(--vscode-font-family)',
    },
    fontSize: {
      'body': 'var(--vscode-font-size)',
    },
    fontWeight: {
      'body': 'var(--vscode-font-weight',
    },
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
        'tk-input-foreground': 'var(--tk-input-foreground)',
        'tk-input-border': 'var(--tk-input-border)',
        'tk-input-background': 'var(--tk-input-background)',
        'tk-input-placeholderForeground': 'var(--tk-input-placeholderForeground)',
      },
      textColor: {
        'tk-input-placeholderForeground': 'var(--tk-input-placeholderForeground)',
      },
      padding: {
        'input-padding-vertical': 'var(--input-padding-vertical)',
        'input-padding-horizontal': 'var(--input-padding-horizontal)'
      }
    },
  },
  plugins: [],
};
