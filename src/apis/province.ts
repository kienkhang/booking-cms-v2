import axios from 'axios'
const provinceInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_PROVINCE_API,
  headers: {
    'Content-Type': 'application/json'
  }
})
class ProvincesAPI {
  // https://provinces.open-api.vn/api/p/
  getProvinces = () => {
    const url = 'p/'
    return useGet({ url, instanceC: provinceInstance })
  }
  getDistricts = (p: string) => {
    const url = `p/${p}/`

    return useGet({ url, instanceC: provinceInstance, params: { deep: 2 } })
  }
  getWards = (d: string) => {
    const url = `d/${d}/`
    return useGet({ url, instanceC: provinceInstance, params: { deep: 2 } })
  }
}

const provinceApi = new ProvincesAPI()
export { provinceApi }
