import { createPinia } from 'pinia'
import type { Router } from 'vue-router'
import type { UserModule } from '@/types'
import accountStore from '@/stores/account'

const navigationAuthGuard = (router: Router) => {
  const { getMe } = useAuth()
  const { account } = storeToRefs(accountStore())
  const { isLoggedIn } = useAuthStorage()
  const { getHotelLocalStore } = useHotelsStore()
  const { hotelId } = useHotelStorage()
  router.beforeEach(async (to, _, next) => {
    const requiredAuth = to.meta.requiredAuth
    const requiredHotel = to.meta.requiredHotel
    // if reload or redirect to any page (logged in) but not account -> get me
    if (isLoggedIn() && !account.value) {
      await getMe().executeAPI()
      // if exist hotel in local and not having current Hotel -> get hotel
      if (hotelId.value && requiredHotel) {
        getHotelLocalStore()
      }
      // from catch navigate to "/" and to catch case reload
      // if need hotel and not hotel saved in store -> goto select
      if (requiredHotel && !hotelId.value) {
        next({ name: 'select' })
      }
    } else if (account.value && hotelId.value && requiredHotel) {
      getHotelLocalStore()
    } else if (requiredHotel && !hotelId.value) {
      next({ name: 'select' })
    }
    // from catch navigate to "/" and to catch case reload
    // if need authen and not login -> goto login
    if (requiredAuth && !isLoggedIn()) {
      next({ name: 'auth' })
    }
    // else next
    else next()
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
  navigationAuthGuard(router)
}
