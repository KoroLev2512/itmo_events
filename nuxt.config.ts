// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  colorMode: {
    preference: "light",
  },
  app: {
    head: {
      title: "ITMO EVENTS – Мероприятия Университета ИТМО",
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#000000" },
        { rel: "yandex-tableau-widget", href: "/tableau.json" },
      ],
      meta: [
        { name: "theme-color", content: "#1d1d1d" },
        { name: "msapplication-TileColor", content: "#000000" },
      ],
    },
  },
  modules: [
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@nuxtjs/robots",
    "nuxt-og-image",
    "nuxt-simple-sitemap",
    "yandex-metrika-module-nuxt3",
    "nuxt-jsonld",
    "@nuxt/ui",
  ],
  auth: {
    provider: {
      type: "authjs",
    },
    baseURL:
      process.env.AUTH_ORIGIN != null
        ? process.env.AUTH_ORIGIN || "/api/auth"
        : "http://localhost:3000/api/auth",
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  nitro: {
    routeRules: {
      "/server/**": {
        proxy: `${process.env.API_URL}/v${process.env.API_VERSION}/**`,
      },
    },
  },
  runtimeConfig: {
    public: {
      baseURL: `${process.env.API_URL}/v${process.env.API_VERSION}`,
      siteUrl:
        process.env.AUTH_ORIGIN != null
          ? process.env.AUTH_ORIGIN
          : "http://localhost:3000",
      mapStyleUrl: `https://api.maptiler.com/maps/28d856a1-4ccf-44ac-81c4-a1845c5369f8/style.json?key=T7xJnaUluFgXXVELKIE4`,
    },
  },
  robots: {
    rules: {
      userAgent: "*",
      disallow: process.env.ENV === "production" ? "" : "/",
      sitemap: process.env.AUTH_ORIGIN + "/sitemap.xml",
    },
  },
  ogImage: {
    fonts: [
      {
        name: "alsgorizont-extrabold",
        weight: 700,
        path: "/fonts/ALSGorizont-ExtraBold.otf",
      },
      {
        name: "golos",
        weight: 400,
        path: "/fonts/GolosText-Regular.ttf",
      },
    ],
  },
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
  },
  yandexMetrika: {
    id: process.env.METRIKA_ID,
    webvisor: true,
    consoleLog: false,
  },
  css: ["@/assets/styles/globals.css"],
});
