import type { StorybookConfig } from '@storybook/nextjs-vite'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      image: {
        excludeFiles: /\.svg$/,
      },
    },
  },
  viteFinal: async (config) => {
    config.plugins = config.plugins ?? []

    config.plugins.unshift(
      tailwindcss(),
      svgr({
        include: /\.svg(\?.*)?$/,
        svgrOptions: {
          icon: true,
        },
      }),
    )

    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    }

    return config
  },
}
export default config
