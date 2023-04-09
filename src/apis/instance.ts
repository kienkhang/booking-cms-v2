import axios from 'axios'
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URI,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.response.use(
  (resp) => {
    if (resp.data) return resp.data

    return resp
  },
  (error) => {
    throw error
  }
)

export default instance
