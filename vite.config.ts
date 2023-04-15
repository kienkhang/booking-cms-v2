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
// NaiveUI
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const customIconPathA = path.resolve(__dirname, 'src/assets/icons/')
const customIconPathB = path.resolve(__dirname, 'src/assets/icons/color')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        {
          pinia: ['storeToRefs', 'defineStore'],
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        }
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables/**', 'src/stores/**'],
      vueTemplate: true
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      resolver: 'vue'
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts({}),
    Icons({
      compiler: 'vue3',
      autoInstall: true,
      // defaultClass: 'w-6 h-6',
      customCollections: {
        custom: FileSystemIconLoader(customIconPathA, (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        ),
        color: FileSystemIconLoader(customIconPathB, (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      }
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      dirs: ['src/components/**'],
      resolvers: [
        IconsResolver({ prefix: 'icon', customCollections: ['custom', 'color'] }),
        NaiveUiResolver()
      ]
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
  },
  server: {
    hmr: true,
    port: 3096
  },
  css: {
    devSourcemap: true
  }
})
