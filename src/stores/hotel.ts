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
  const hotelCount = computed(() => hotels.value.length)

  // dynamic paging
  const paging = ref<{
    total_items?: number
    total_pages?: number
    page?: number
    offset?: number
  }>({
    total_items: 0,
    total_pages: 0,
    offset: -1,
    page: 1
  })
  const filter = ref<{
    offset?: number
    page?: number
    [filter: string]: any
  }>()

  // Select Hotel to manipulates
  const setCurrentHotel = (hotel: IHotel) => {
    currentHotel.value = hotel
  }

  // Get hotel with role admin
  const getHotelAdmin = async () => {
    const usedGetHotel = hotelsApi.getHotels(filter.value)
    const { data, error, isFinished } = usedGetHotel
    await usedGetHotel.execute()
    // After get hotel -> save global state
    // Response is <data:{ data:[], paging:{}}>
    if (!error.value) {
      hotels.value = data.value.data
      paging.value = data.value.paging
    } else {
      hotelId.value = null
    }
    // After get data -> reset paging to null
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        filter.value = null
      })
    return usedGetHotel
  }
  // Get hotel with role partner (hotelier | manager | staff)
  const getHotelPartner = async () => {
    const usedGetHotel = hotelsApi.partnerGetHotel(filter.value)
    const { data, error, isFinished } = usedGetHotel
    // Execute get hotel
    await usedGetHotel.execute()
    // After get hotel -> save global state
    // Response is <data:{ data:[], paging:{}}>
    if (!error.value) {
      hotels.value = data.value.data
      paging.value = data.value.paging
    } else {
      hotelId.value = null
    }
    // After get data -> reset paging to null
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        filter.value = null
      })
    return usedGetHotel
  }

  // Set current hotel with hotelId from localstorage
  const getHotelLocalStore = async () => {
    if (!hotelId.value || currentHotel.value) return
    filter.value = {
      id: hotelId.value
    }
    // Get hotel
    await getHotels()
    setCurrentHotel(hotels.value[0])
  }

  // Get Hotels
  const getHotels = async () => {
    if (['ADMIN', 'SUPPERADMIN'].includes(role.value)) {
      await getHotelAdmin()
    } else if (role.value === 'HOTELIER') {
      await getHotelPartner()
    }
  }

  // When ever hotelId change and not null -> get HotelLocalStore
  whenever(hotelId, async () => {
    await getHotelLocalStore()
  })

  return {
    hotels,
    hotelCount,
    currentHotel,
    paging,
    filter,
    getHotelAdmin,
    getHotelPartner,
    getHotelLocalStore,
    setCurrentHotel,
    getHotels
  }
}

export default defineStore('hotels_store', useHotelStore)
