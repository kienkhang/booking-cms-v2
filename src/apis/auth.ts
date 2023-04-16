const path = 'auth/'
class Auth {
  login = (data: any | {}) => {
    const url = path + 'login/general'

    return usePost({ url, data })
  }

  signup = (data: any | {}) => {
    const url = path + 'signup'

    return usePost({ url, data })
  }
  refresh = () => {
    const url = path + 'refresh-token'
    return useGet({ url, requiredToken: true })
  }
}
const authApi = new Auth()

export { authApi }
