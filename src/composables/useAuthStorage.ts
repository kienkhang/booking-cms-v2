import { useCookies } from '@vueuse/integrations/useCookies'

const token = 'acc.token'

const useAuthStorage = () => {
  const { get, set, remove } = useCookies([token], { doNotParse: false })

  const getToken = (): string => get(token)

  const setToken = (value: string) => set(token, value, { path: '/' })

  const removeToken = () => remove(token)

  const isLoggedIn = () => !!getToken()

  return {
    getToken,
    setToken,
    removeToken,
    isLoggedIn
  }
}

export { useAuthStorage }
