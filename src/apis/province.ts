import { useAxios } from '@vueuse/integrations/useAxios'
import axios from 'axios'
const provinceInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_PROVINCE_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

interface Ward {
  code: number
  codename: string
  district_code: number
  division_type: string
  name: string
}

interface District {
  code: number
  codename: string
  division_type: string
  name: string
  province_code: number
  wards: Ward[]
}

interface Province {
  code: number
  codename: string
  districts: District[]
  division_type: string
  name: string
  phone_code: number
}
class ProvincesAPI {
  // https://provinces.open-api.vn/api/p/
  getProvinces = () => {
    const url = 'p/'
    return useAxios<Province[]>(url, { method: 'get' }, provinceInstance, { immediate: false })
  }
  getDistricts = (p: string | number) => {
    const url = `p/${p}`

    return useAxios<Province>(url, { method: 'get', params: { depth: 2 } }, provinceInstance, {
      immediate: false
    })
  }
  getWards = (d: string | number) => {
    const url = `d/${d}`
    return useAxios<District>(url, { method: 'get', params: { depth: 2 } }, provinceInstance, {
      immediate: false
    })
  }
}

const provinceApi = new ProvincesAPI()
export { provinceApi }
