import { hotelsApi } from '@/apis/hotel'
import { IHotelAdd, IHotelUpdate } from '@/dtos'
import { useHotelsStore } from '@/stores'

const useHotel = () => {
  const message = useMessage()
  const { hotels, paging, filter } = storeToRefs(useHotelsStore())
  const { getHotelLocalStore } = useHotelsStore()

  // handle create hotel
  function createHotel(form: Ref<IHotelAdd>) {
    // call api
    const usedCreateHotel = hotelsApi.createHotel(form.value)
    // destructuring useAxios struct
    const { execute, isFinished, error } = usedCreateHotel

    // after finished && not error -> Get hotel
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (!error.value) {
          getHotelLocalStore()
          message.success('Tạo khách sạn thành công')
        }
      })

    // return with custom useAxios struct
    return {
      ...usedCreateHotel,
      executeApi: () => execute({ data: { ...form.value } })
    }
  }
  // handle update hotel
  function updateHotel(form: Ref<IHotelUpdate>, hotelId: string) {
    // call api
    const usedUpdateHotel = hotelsApi.updateHotel(form.value, hotelId)
    // destructuring useAxios struct
    const { execute, isFinished, error } = usedUpdateHotel
    // after finished && not error -> Get user
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        !error.value && getHotelLocalStore() && message.success('Cập nhật khách sạn thành công')
      })
    // return with custom useAxios struct
    return {
      ...usedUpdateHotel,
      executeApi: () => execute({ data: { ...form.value } })
    }
  }
  // handle upload image file
  function uploadPhotos(hotelId: string) {
    const usedUpload = hotelsApi.updatePhotos({}, hotelId)

    const { execute } = usedUpload

    return {
      ...usedUpload,
      executeApi: async (f: FormData) => {
        try {
          await execute({ data: f })
          await getHotelLocalStore()
          message.success('Cập nhật hình ảnh thành công')
        } catch (e) {
          message.success('Cập nhật hình ảnh thất bại')
          throw new Error(e)
        }
      }
    }
  }
  // handle upload business license
  function uploadBL(hotelId: string) {
    const usedUpload = hotelsApi.updateBL({}, hotelId)

    const { execute } = usedUpload

    return {
      ...usedUpload,
      executeApi: async (f: { images: File; text: string[] }) => {
        try {
          await execute({ data: { ...f } })
          await getHotelLocalStore()
          message.success('Cập nhật hình ảnh thành công')
        } catch (e) {
          message.success('Cập nhật hình ảnh thất bại')
          throw new Error(e)
        }
      }
    }
  }

  return {
    hotels,
    paging,
    filter,
    createHotel,
    updateHotel,
    uploadPhotos,
    uploadBL
  }
}
export default useHotel
