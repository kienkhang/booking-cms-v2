import { createPinia } from 'pinia'
// import type { Router } from 'vue-router'
import type { UserModule } from '@/types'

// const navigationGuard = (router: Router) => {
//   const { getProfile } = useAuth()
//   router.beforeEach((to, from, next) => {
//     // from catch navigate to "/" and to catch case reload
//     if (from.path === '/' || to.path === '/') {
//       getProfile()
//       return next()
//     }
//  else {
//       return next()
//     }
//   })
// }
// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ isClient, initialState, app, router }) => {
  const pinia = createPinia()
  app.use(pinia)
  // Refer to
  // https://github.com/antfu/vite-ssg/blob/main/README.md#state-serialization
  // for other serialization strategies.
  if (isClient) pinia.state.value = initialState.pinia || {}
  else initialState.pinia = pinia.state.value

  // Navigation guard
  // navigationGuard(router)
}
