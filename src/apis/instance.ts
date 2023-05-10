import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URI,
  headers: {
    'Content-Type': 'application/json'
  }
})

const { getRToken } = useAuthStorage()
const refreshToken = getRToken()

instance.interceptors.response.use(
  (resp) => {
    if (resp.data) return resp.data

    return resp
  },
  async (error) => {
    const { refresh, logout } = useAuth()
    // Get status code
    const status = error?.response.status
    // Get message jwt
    const message = error?.response.data.message //invalid or expired jwt
    // Get preConfig
    const preConfig = error?.config
    // Check status and custom properties is "sent" meaning request is sended ?
    if (status === 401 && message === 'invalid or expired jwt' && !preConfig?._retry) {
      preConfig._retry = true

      const { data, executeAPI, error } = refresh({ refresh_token: refreshToken })
      // Execute refresh token
      await executeAPI()
      // If error -> logout
      if (error.value) {
        logout()
        return
      }
      // After execute -> Return preConfig with new access token
      const newAccessToken = data.value?.access_token
      instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
      return instance(preConfig)
    }
    return Promise.reject(error)
  }
)
instance.interceptors.request.use(
  (req) => {
    return req
  },
  (error) => {
    return error
  }
)

export default instance
