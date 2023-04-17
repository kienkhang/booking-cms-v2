import { authApi } from '@/apis/auth'
import { usersApi } from '@/apis/users'

const useAuth = () => {
  const { setToken, setRToken } = useAuthStorage()
  const login = ({ email = '', password = '' }) => {
    const usedLogin = authApi.login({ email, password })
    const { execute, isFinished, data } = usedLogin

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        console.log('🐔🦢 ~ login ~ data:', data.value)
        setToken(data.value?.access_token)
        setRToken(data.value?.refresh_token)
      })

    return { ...usedLogin, executeAPI: () => execute({ data: { email, password } }) }
  }
  const signup = ({ email = '', password = '', first_name = '', last_name = '' }) => {
    const usedSignup = authApi.signup({ email, password, first_name, last_name })
    const { execute, isFinished, data } = usedSignup

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        console.log('🐔🦢 ~ signup ~ data:', data.value)
        setToken(data.value?.access_token)
        setRToken(data.value?.refresh_token)
      })

    return {
      ...usedSignup,
      executeAPI: () => execute({ data: { email, password, first_name, last_name } })
    }
  }
  const refresh = () => {
    const usedRefresh = authApi.refresh({})

    const { isFinished, data } = usedRefresh

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        console.log('🐔🦢 ~ refresh ~ data:', data.value)
        if (data.value) {
          setToken(data.value?.access_token)
          setRToken(data.value?.refresh_token)
        }
      })
    return {
      ...usedRefresh
    }
  }
  const getMe = () => {
    const usedDetails = usersApi.details()
    const { isFinished, data } = usedDetails

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        console.log('🐔🦢 ~ getMe ~ data:', data.value)
      })
    return {
      ...usedDetails
    }
  }

  return {
    login,
    signup,
    refresh,
    getMe
  }
}

export default useAuth
