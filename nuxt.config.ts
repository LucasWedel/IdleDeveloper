export default defineNuxtConfig({
  devtools: { enabled: true },

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2024-09-10',
  
  srcDir: 'src/',
});