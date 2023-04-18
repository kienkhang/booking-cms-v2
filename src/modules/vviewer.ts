import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import type { UserModule } from '@/types'

export const install: UserModule = ({ app }) => {
  app.use(VueViewer)
}
