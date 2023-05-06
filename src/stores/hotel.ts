import { hotelsApi } from '@/apis/hotel'
import type { IHotel } from '@/dtos'

const useHotelStore = () => {
  // Get hotel id from localstorage
  const { hotelId } = useHotelStorage()
  // Get current role
  const { role } = storeToRefs(useAccountsStore())
  // Get current hotel
  const currentHotel = ref<IHotel>()
  // List hotel with paging
  const hotels = ref<IHotel[]>([])

  // dynamic paging
  const paging = ref<{
    limit?: number
    page?: number
    [filter: string]: any
  }>()

  // Select Hotel to manipulates
  const setCurrentHotel = (hotel: IHotel) => {
    currentHotel.value = hotel
  }

  // Get hotel with role admin
  const getHotelAdmin = async () => {
    const usedGetHotel = hotelsApi.getHotels(paging.value)
    const { data, error } = usedGetHotel
    await usedGetHotel.execute()
    if (!error.value) {
      hotels.value = data.value
    }
    return usedGetHotel
  }
  // Get hotel with role partner (hotelier | manager | staff)
  const getHotelPartner = async () => {
    const usedGetHotel = hotelsApi.partnerGetHotel(paging.value)
    const { data, error } = usedGetHotel
    await usedGetHotel.execute()
    if (!error.value) {
      hotels.value = data.value
    }
    return usedGetHotel
  }

  // Set current hotel with hotelId from localstorage
  const getHotelLocalStore = async () => {
    paging.value = {
      limit: 1,
      page: 1,
      id: hotelId.value
    }
    const { data } = await getHotelPartner()
    setCurrentHotel(data.value[0])
  }

  // Get Hotels
  const getHotels = async () => {
    if (['ADMIN', 'SUPPERADMIN'].includes(role.value)) {
      await getHotelAdmin()
    } else {
      await getHotelPartner()
    }
  }

  return {
    hotels,
    currentHotel,
    paging,
    getHotelAdmin,
    getHotelPartner,
    getHotelLocalStore,
    setCurrentHotel,
    getHotels
  }
}

export default defineStore('hotels_store', useHotelStore)
