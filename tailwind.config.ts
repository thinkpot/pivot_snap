import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        ink: '#08111f',
        accent: '#38bdf8',
        success: '#22c55e',
      },
    },
  },
  plugins: [],
}

export default config
