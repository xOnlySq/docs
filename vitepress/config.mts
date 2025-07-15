import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OnlySq Documentation",
  description: "Site contains comprehensive documentation for all OnlySQ services, designed for developers' self-learning. It provides free and unrestricted access to popular neural networks, enabling users to explore, experiment, and integrate cutting-edge AI tools into their projects effortlessly.",
  themeConfig: {
    logo: {
      light: '/images/logo-light.svg',
      dark: '/images/logo-dark.svg'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'API',
        items: [
          { text: '<span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">SDK</span> OpenAI', link: '/docs/openaisdk'},
          // { text: '<span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">SDK</span> OnlySq', link: '/docs/onlysqsdk'},
          { text: '<span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">POST</span> API2.0', link: '/docs/endpoint2'},
          { text: '<span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">POST</span> ImaGen', link: '/docs/imagen'}
        ]
      },
      { text: 'All models', link: '/docs/models' },
      { text: 'About us', link: '/about'},
    ],

    sidebar: [
      
      {
        text: 'API2.0',
        // collapsed: true,
        items: [
          { text: 'About', link: '/docs/api'},
          { text: 'Get started', link: '/getstarted' },
          { text: 'All models', link: '/docs/models' },
        ]
      },
      {
        text: 'Endpoints',
        // collapsed: true,
        items: [
          { text: '<span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">SDK</span> OpenAI', link: '/docs/openaisdk'},
          // { text: '<span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">SDK</span> OnlySq', link: '/docs/onlysqsdk'},
          { text: '<span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">POST</span> API2.0', link: '/docs/endpoint2'},
          { text: '<span style="color: white; background-color: #0d47a1; padding: 0.2em 0.5em; border-radius: 5px; font-size: 0.8em; font-weight: bold;">POST</span> ImaGen', link: '/docs/imagen'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'telegram', link: 'https://t.me/onlysq' },
      { icon: 'github', link: 'https://github.com/xOnlySq' },
      { icon: 'tiktok', link: 'https://www.tiktok.com/@only_sq' }
    ],
    
    lastUpdated: true,
    outline: [2,3],
  }
})
