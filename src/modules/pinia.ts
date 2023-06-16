import { createPinia } from 'pinia'
import type { Router } from 'vue-router'
import type { UserModule } from '@/types'
import accountStore from '@/stores/account'

function navigationAuthGuard(router: Router) {
  // Destruct account from store
  const { account } = storeToRefs(accountStore())
  // Destruct get Hotel from local function
  // const { getHotelLocalStore } = useHotelsStore()
  // Destruct get profile from composables
  const { getMe } = useAuth()
  // Destruct isLoggedIn status from cookie
  const { isLoggedIn } = useAuthStorage()
  // Destruct hotelId from localstorage
  // const { hotelId } = useHotelStorage()
  router.beforeEach(async (to, from, next) => {
    // Check location to authen
    const requiredAuth = to.meta.requiredAuth
    // const requiredHotel = to.meta.requiredHotel

    // from catch navigate to "/" and to catch case reload
    // if need authen and not login -> goto login
    if (requiredAuth && !isLoggedIn()) {
      return next({ name: 'auth' })
    }

    // if reload or redirect to any page (logged in) but not account -> get me
    if (isLoggedIn() && !account.value && requiredAuth) {
      await getMe().executeAPI()
      // hotelGuard(to, next)
    }
    // if (account.value) {
    //   hotelGuard(to, from)
    // }

    return next()
  })
}

function navigationHotelGuard(router: Router) {
  // Destruct account from store
  const { account } = storeToRefs(accountStore())
  // Destruct get Hotel from local function
  const { getHotelLocalStore } = useHotelsStore()
  // Destruct hotelId from localstorage
  const { hotelId } = useHotelStorage()
  router.beforeEach((to, from, next) => {
    // Check location to required hotel
    const requiredHotel = to.meta.requiredHotel
    // if exist hotel in local and not having current Hotel -> get hotel
    if (hotelId.value && requiredHotel && account.value) {
      getHotelLocalStore()
    }
    // from catch navigate to "/" and to catch case reload
    // if need hotel and not hotel saved in store -> goto select
    else if (!hotelId.value && requiredHotel) {
      if (from.name !== 'select') {
        return next({ name: 'select' })
      }
    }
    return next()
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
  navigationHotelGuard(router)
}
