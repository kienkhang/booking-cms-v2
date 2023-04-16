import { authApi } from '@/apis/auth'
import { usersApi } from '@/apis/users'

const useAuth = () => {
  const login = ({ email = '', password = '' }) => {
    const usedLogin = authApi.login({ email, password })
    const { execute } = usedLogin

    return { ...usedLogin, executeAPI: () => execute({ data: { email, password } }) }
  }
  const signup = ({ email = '', password = '', first_name = '', last_name = '' }) => {
    const usedSignup = authApi.signup({ email, password, first_name, last_name })
    const { execute } = usedSignup

    return {
      ...usedSignup,
      executeAPI: () => execute({ data: { email, password, first_name, last_name } })
    }
  }
  const refresh = () => {
    const usedRefresh = authApi.refresh()
    return {
      ...usedRefresh
    }
  }
  const getMe = () => {
    const usedDetails = usersApi.details()
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
