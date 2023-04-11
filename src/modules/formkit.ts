import type { DefaultConfigOptions } from '@formkit/vue'
import { defaultConfig, plugin } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
import { en, vi } from '@formkit/i18n'
import { themeClass } from './../libs/formkit'
import type { UserModule } from '@/types'

const config: DefaultConfigOptions = {
  classes: generateClasses(themeClass)
}

export const install: UserModule = ({ app }) => {
  app.use(
    plugin,
    defaultConfig({
      config,
      // Define additional locales
      locales: { vi, en },
      // Define the active locale (Viet Nam)
      locale: 'vi'
    })
  )
}
