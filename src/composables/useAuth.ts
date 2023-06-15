import { authApi } from '@/apis/auth'
import { usersApi } from '@/apis/users'
import accountStore from '@/stores/account'

const useAuth = () => {
  const { setToken, setRToken, removeToken } = useAuthStorage()
  const login = (form: { email: string; password: string }) => {
    const usedLogin = authApi.login({})
    const { execute, isFinished, data } = usedLogin

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        setToken(data.value?.access_token)
        setRToken(data.value?.refresh_token)
      })

    return { ...usedLogin, executeAPI: () => execute({ data: { ...form } }) }
  }
  const signup = (form: {
    email: string
    password: string
    first_name: string
    last_name: string
  }) => {
    const usedSignup = authApi.signup({})
    const { execute, isFinished, data } = usedSignup

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        setToken(data.value?.access_token)
        setRToken(data.value?.refresh_token)
      })

    return {
      ...usedSignup,
      executeAPI: () => execute({ data: { form } })
    }
  }
  const refresh = (form: { refresh_token: string }) => {
    const usedRefresh = authApi.refresh({})

    const { isFinished, data, execute } = usedRefresh

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (data.value) {
          setToken(data.value?.access_token)
          setRToken(data.value?.refresh_token)
        }
      })
    return {
      ...usedRefresh,
      executeAPI: () => execute({ data: { ...form } })
    }
  }

  const reset = (form: { new_password: string; token: string }) => {
    const usedRefresh = authApi.reset({})

    const { execute } = usedRefresh

    return {
      ...usedRefresh,
      executeAPI: () => execute({ data: { ...form } })
    }
  }
  const getMe = () => {
    const usedDetails = usersApi.details()
    const { isFinished, data, execute } = usedDetails

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        accountStore().setAccount(data.value)
      })
    return {
      ...usedDetails,
      executeAPI: () => execute()
    }
  }
  const logout = () => {
    return new Promise((resolve) => {
      resolve(removeToken())
    })
  }

  return {
    login,
    signup,
    refresh,
    reset,
    getMe,
    logout
  }
}

export default useAuth
