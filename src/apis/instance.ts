import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URI,
  headers: {
    'Content-Type': 'application/json'
  }
})

const { getRToken, getToken } = useAuthStorage()

instance.interceptors.response.use(
  (resp) => {
    if (resp.data) return resp.data
    return resp
  },
  async (error) => {
    const { refresh, logout } = useAuth()
    // Get status code
    const status = error?.response?.status
    // Get message jwt
    // invalid or expired jwt
    const message = error?.response?.data.message
    // Get preConfig
    const preConfig = error.config
    // =========================================================================
    // !falsy_value = true
    // Check status and custom properties is "sent" meaning request is sended ?
    if (status === 401 && message === 'invalid or expired jwt' && !preConfig?._retry) {
      // each error with 401 expired jwt -> get refreshToken
      const refreshToken = getRToken()
      // set retry = true
      preConfig._retry = true
      // Destruct useAxios refresh token
      const { data, executeAPI } = refresh({ refresh_token: refreshToken })

      try {
        await executeAPI()
        // After execute -> Return preConfig with new access token
        const newAccessToken = data.value?.access_token
        preConfig.headers.Authorization = `Bearer ${newAccessToken}`
        // after call success -> set retry to false
        preConfig._retry = false
        // resend request with axios(config)
        return instance(preConfig)
      } catch (tryError) {
        logout()
        throw tryError
      }
    }
    return Promise.reject(error)
  }
)
instance.interceptors.request.use(
  (req) => {
    const access_token = getToken()
    if (access_token) req.headers.Authorization = `Bearer ${access_token}`
    return req
  },
  (error) => {
    return error
  }
)

export default instance
