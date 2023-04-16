import { useCookies } from '@vueuse/integrations/useCookies'

const token = 'acc.token'
const refresh = 'acc.rtoken'

const useAuthStorage = () => {
  const { get, set, remove } = useCookies([token], { doNotParse: false })

  const getToken = (): string => get(token)
  const getRToken = (): string => get(refresh)

  const setToken = (value: string) => set(token, value, { path: '/' })
  const setRToken = (value: string) => set(refresh, value, { path: '/' })

  const removeToken = () => remove(token)

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
