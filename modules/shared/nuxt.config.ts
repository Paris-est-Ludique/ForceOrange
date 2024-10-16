import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  extends: ['@nuxt/ui-pro'],

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    // '@nuxt/icon', // installed with nuxt-ui
    '@nuxt/fonts',
    '@nuxt/ui',
  ],

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Avent 2023' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  components: [
    {
      path: join(currentDir, './components'),
      pathPrefix: false,
    },
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  ui: {
    safelistColors: ['orange', 'slate'],
  },

  fonts: {
    families: [
      {
        name: 'Grobold',
        src: '/fonts/GROBOLD.woff2',
      },
      {
        name: 'Signika',
        provider: 'google',
        weights: [300, 400, 600],
      },
    ],
  },
})
