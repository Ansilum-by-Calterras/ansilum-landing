const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const headlessuiPlugin = require('@headlessui/tailwindcss')
const typographyPlugin = require('@tailwindcss/typography')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        // Ansilum marketing palette: clean white surfaces and near-black text, with one warm
        // brand orange for emphasis and data. Amber and green mark highlights and gains.
        canvas:    '#FFFFFF',
        mist:      '#F4F5F7',
        line:      '#E3E6EB',
        steel:     '#9AA4B2',
        night:     '#0D1117',
        ink:       '#111418',
        soft:      '#545D6A',
        brand: {
          DEFAULT: '#FF5B1F',
          ink:     '#C23D0C',
          soft:    '#FFEEE6',
        },
        leaf: {
          DEFAULT: '#12805A',
          soft:    '#E2F5EC',
        },
        sun:       '#FFC53D',
        background:  'var(--background)',
        foreground:  'var(--foreground)',
        border:      'var(--border)',
        input:       'var(--input)',
        ring:        'var(--ring)',
        primary: {
          DEFAULT:    'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT:    'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT:    'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT:    'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT:    'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        card: {
          DEFAULT:    'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT:    'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        success: {
          DEFAULT:    'var(--success)',
          foreground: 'var(--success-foreground)',
        },
        warning: {
          DEFAULT:    'var(--warning)',
          foreground: 'var(--warning-foreground)',
        },
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
        sidebar: {
          DEFAULT:            'var(--sidebar)',
          foreground:         'var(--sidebar-foreground)',
          primary:            'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent:             'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border:             'var(--sidebar-border)',
          ring:               'var(--sidebar-ring)',
        },
      },
    },
  },
  plugins: [addVariablesForColors, headlessuiPlugin, typographyPlugin],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
