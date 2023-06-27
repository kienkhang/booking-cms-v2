import { useCookies } from '@vueuse/integrations/useCookies'

const token = 'acc.token'
const refresh = 'acc.rtoken'

const useAuthStorage = () => {
  const { get, set, remove } = useCookies([token], { doNotParse: false })

  const getToken = (): string => get(token)
  const getRToken = (): string => get(refresh)

  const setToken = (value: string) => set(token, value, { domain: import.meta.env.VITE_APP_DOMAIN })
  const setRToken = (value: string) =>
    set(refresh, value, { domain: import.meta.env.VITE_APP_DOMAIN })

  const removeToken = () => {
    remove(token)
    remove(refresh)
  }

  const isLoggedIn = () => !!getToken()

  return {
    getToken,
    setToken,
    getRToken,
    setRToken,
    removeToken,
    isLoggedIn
  }
}

export { useAuthStorage }
