import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Autoimport
import AutoImport from 'unplugin-auto-import/vite'
// Pages
import Pages from 'vite-plugin-pages'
// Layout
import Layouts from 'vite-plugin-vue-layouts'
// Components
import Components from 'unplugin-vue-components/vite'
// I18
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// Unplugin Icon
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

const customIconPath = path.resolve(__dirname, 'src/assets/icons/')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        {
          pinia: ['storeToRefs', 'defineStore']
        }
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores'],
      vueTemplate: true
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md']
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      // defaultClass: 'w-6 h-6',
      customCollections: {
        custom: FileSystemIconLoader(customIconPath, (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      }
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: './src/components.d.ts',
      resolvers: [IconsResolver({ prefix: 'icon', customCollections: ['custom'] })]
    }),
    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18nPlugin({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'locales/**')]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
