import type { DefaultConfigOptions } from '@formkit/vue'
import { defaultConfig, plugin } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import { en, vi } from '@formkit/i18n'
import { themeClass } from './../libs/formkit'
import type { UserModule } from '@/types'
import useLanguageStorage from '@/composables/useLanguageStorage'

const config: DefaultConfigOptions = {
  classes: generateClasses(themeClass)
}
const { locale } = useLanguageStorage()

export const install: UserModule = ({ app }) => {
  app.use(
    plugin,
    defaultConfig({
      config,
      // Define additional locales
      locales: { vi, en },
      // Define the active locale (Viet Nam)
      locale: locale.value || navigator.language.includes('vi') ? 'vi' : 'en',
      iconLoaderUrl: (iconName) => {
        // get icon from iconify API, else get icon from local
        const [prefix, name, size] = iconName.split(':')
        let url = ''
        if (size) {
          url = `https://api.iconify.design/${prefix}/${name}.svg?height=${size}&width=${size}`
          return url
        } else if (prefix !== undefined && name !== undefined) {
          url = `https://api.iconify.design/${prefix}/${name}.svg?height=24&width=24`
          return url
        } else {
          // Get icon from local
          return new URL(`/src/assets/icons/${iconName}.svg`, import.meta.url).href
        }
      }
    })
  )
}
