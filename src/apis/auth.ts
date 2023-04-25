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
  refresh = (data: any | {}) => {
    const url = path + 'refresh-token'
    return usePost({ url, data, requiredToken: true })
  }

  reset = (data: any | {}) => {
    const url = path + 'reset'
    return usePost({ url, data })
  }
}
const authApi = new Auth()

export { authApi }
