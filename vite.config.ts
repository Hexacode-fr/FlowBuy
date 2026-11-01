import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'
import { minimal2023Preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  plugins: [
    solid(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      pwaAssets: {
        preset: {
          ...minimal2023Preset,
          transparent: { ...minimal2023Preset.transparent, padding: 0 },
          maskable: { ...minimal2023Preset.maskable, padding: 0 },
          apple: { ...minimal2023Preset.apple, padding: 0 },
        },
        image: 'public/logo.svg',
      },
      manifest: {
        name: 'FlowBuy',
        short_name: 'FlowBuy',
        description: 'Là où vos courses deviennent vraiment simples',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
})