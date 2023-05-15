// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      url: process.env.SUPABASE_API_URL,
      key: process.env.SUPABASE_ANON_KEY,
    }
  }
})
