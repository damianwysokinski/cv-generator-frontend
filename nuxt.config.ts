// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-graphql-client',
  ],
  plugins: [
    '~/plugins/auth',
  ],
  'graphql-client':{
    watch: true,
    autoImport: true,
    functionPrefix: 'Gql',
    documentPaths: ['./graphql'],
    preferGETQueries: false,
  },
  runtimeConfig: {
    public: {
      GQL_HOST: process.env.QGL_HOST || ""
    }
  },
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
  },
})