// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-11',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      env: '',
    },
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },

  extends: ['@pel/shared'],

  modules: ['@nuxtjs/supabase', '@nuxt/content', "@nuxt/image"],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  supabase: {
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_KEY || '',
    redirect: true,
    redirectOptions: {
      login: '/signin',
      callback: '/signin/confirm',
      exclude: ['/*'],
    },
    cookieName: 'fo-cookies',
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true,
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  },
})
