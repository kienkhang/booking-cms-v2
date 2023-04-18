import { provinceApi } from '@/apis/province'

type SelectOptions = {
  value: number
  label: string
}

const useProvinces = () => {
  const province = ref<number>()
  const district = ref<number>()
  const ward = ref<number>()
  const pOptions = ref<SelectOptions[]>([])
  const dOptions = ref<SelectOptions[]>([])
  const wOptions = ref<SelectOptions[]>([])

  const selectProvince = () => {
    const usedGetProvince = provinceApi.getProvinces()
    const { isFinished, data, execute } = usedGetProvince

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        pOptions.value = data.value.map((p) => ({
          value: p.code,
          label: p.name
        }))
      })
    return {
      ...usedGetProvince,
      executeAPI: () => execute()
    }
  }
  const selectDistrict = (p: string | number) => {
    const usedGetDistrict = provinceApi.getDistricts(p)
    const { isFinished, data, execute } = usedGetDistrict

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        const districts = data.value.districts
        dOptions.value = districts.map((p) => ({
          value: p.code,
          label: p.name
        }))
      })
    return {
      ...usedGetDistrict,
      executeAPI: () => execute()
    }
  }
  const selectWard = (d: string | number) => {
    const usedGetWard = provinceApi.getWards(d)
    const { isFinished, data, execute } = usedGetWard

    until(isFinished)
      .toBeTruthy()
      .then(() => {
        const wards = data.value.wards
        wOptions.value = wards.map((p) => ({
          value: p.code,
          label: p.name
        }))
      })
    return {
      ...usedGetWard,
      executeAPI: () => execute()
    }
  }

  // Tỉnh thay đổi thì reset huyện/thành phố với phường/xã
  watch([province], () => {
    district.value = undefined
    ward.value = undefined
    dOptions.value = []
    wOptions.value = []
  })
  // Huyện/thành phố thay đổi thì reset phường/xã
  watch([district], () => {
    ward.value = undefined
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
