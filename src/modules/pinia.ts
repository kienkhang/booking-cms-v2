import { createPinia } from 'pinia'
import type { Router } from 'vue-router'
import type { UserModule } from '@/types'
import accountStore from '@/stores/account'

const navigationGuard = (router: Router) => {
  const { getMe } = useAuth()
  const { account } = storeToRefs(accountStore())
  const { isLoggedIn } = useAuthStorage()
  router.beforeEach((to, _, next) => {
    const requiredAuth = to.meta.requiredAuth
    // from catch navigate to "/" and to catch case reload
    // if need authen and not login -> goto login
    if (requiredAuth === true && !isLoggedIn()) {
      next({ name: 'auth' })
    }
    // else next
    else next()
    // if reload or redirect to any page (logged in) but not account -> get me
    if (!!account.value === false && isLoggedIn()) {
      getMe().executeAPI()
    }
  })
}
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
  navigationGuard(router)
}
