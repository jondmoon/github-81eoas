// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    'vuetify/lib/styles/main.sass',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
  modules: [
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore'],
      },
    ],
  ],
});
