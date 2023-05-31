import { hotelsApi } from '@/apis/hotel'
import { IHotelAdd, IHotelUpdate } from '@/dtos'
import { useHotelsStore } from '@/stores'

const useHotel = () => {
  const message = useMessage()
  const { hotels, paging, filter } = storeToRefs(useHotelsStore())
  const { getHotels } = useHotelsStore()

  // handle create hotel
  const createHotel = (form: Ref<IHotelAdd>) => {
    // call api
    const usedCreateHotel = hotelsApi.createHotel(form.value)
    // destructuring useAxios struct
    const { execute, isFinished, error } = usedCreateHotel

    // after finished && not error -> Get hotel
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (!error.value) {
          getHotels()
          message.success('Tạo khách sạn thành công')
        }
      })

    // return with custom useAxios struct
    return {
      ...usedCreateHotel,
      executeApi: () => execute({ data: { ...form.value } })
    }
  }
  // handle create hotel
  const updateHotel = (form: Ref<IHotelUpdate>, hotelId: string) => {
    // call api
    const usedUpdateHotel = hotelsApi.updateHotel(form.value, hotelId)
    // destructuring useAxios struct
    const { execute, isFinished, error } = usedUpdateHotel
    // after finished && not error -> Get user
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        !error.value && getHotels() && message.success('Cập nhật khách sạn thành công')
      })
    // return with custom useAxios struct
    return {
      ...usedUpdateHotel,
      executeApi: () => execute({ data: { ...form.value } })
    }
  }

  return {
    hotels,
    paging,
    filter,
    createHotel,
    updateHotel
  }
}
export default useHotel
