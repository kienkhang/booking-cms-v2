import { provinceApi } from '@/apis/province'

type SelectOptions = {
  value: number
  label: string
}

const useProvinces = () => {
  const province = ref(0)
  const district = ref(0)
  const ward = ref(0)
  const pOptions = ref<SelectOptions[]>([])
  const dOptions = ref<SelectOptions[]>([])
  const wOptions = ref<SelectOptions[]>([])

  const selectProvince = () => {
    const usedGetProvince = provinceApi.getProvinces()
    const { isFinished, data, execute } = usedGetProvince

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        console.log('🐔🦢 ~ selectProvince ~ data:', data.value)
      })
    return {
      ...usedGetProvince,
      executeAPI: () => execute()
    }
  }
  const selectDistrict = () => {
    const usedGetDistrict = provinceApi.getDistricts(province.value + '')
    const { isFinished, data, execute } = usedGetDistrict

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        console.log('🐔🦢 ~ selectDistrict ~ data:', data.value)
      })
    return {
      ...usedGetDistrict,
      executeAPI: () => execute()
    }
  }
  const selectWard = () => {
    const usedGetWard = provinceApi.getWards(district.value + '')
    const { isFinished, data, execute } = usedGetWard

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        console.log('🐔🦢 ~ selectProvince ~ data:', data.value)
      })
    return {
      ...usedGetWard,
      executeAPI: () => execute()
    }
  }

  // Tỉnh thay đổi thì reset huyện/thành phố với phường/xã
  watch([province], () => {
    dOptions.value = []
    wOptions.value = []
  })
  // Huyện/thành phố thay đổi thì reset phường/xã
  watch([district], () => {
    wOptions.value = []
  })
  return {
    province,
    district,
    ward,
    pOptions,
    dOptions,
    wOptions,
    selectProvince,
    selectDistrict,
    selectWard
  }
}
export default useProvinces
