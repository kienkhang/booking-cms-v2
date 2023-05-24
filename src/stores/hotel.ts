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
  // filtering
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
  const getHotelAdmin = () => {
    const usedGetHotel = hotelsApi.getHotels(filter.value)
    const { data, error, isFinished, execute } = usedGetHotel

    // After get data -> reset paging to null
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        // After get hotel & not error -> save global state
        // Response is <data:{ data:[], paging:{}}>
        if (!error.value) {
          hotels.value = data.value.data
          paging.value = data.value.paging
        } else {
          hotelId.value = null
        }
        filter.value = null
      })
    return { ...usedGetHotel, executeApi: () => execute({ params: filter.value }) }
  }
  // Get hotel with role partner (hotelier | manager | staff)
  const getHotelPartner = () => {
    const usedGetHotel = hotelsApi.partnerGetHotel(filter.value)
    const { data, error, isFinished, execute } = usedGetHotel

    // After get data -> reset paging to null
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        // After get hotel & not error -> save global state
        // Response is <data:{ data:[], paging:{}}>
        if (!error.value) {
          hotels.value = data.value.data
          paging.value = data.value.paging
        } else {
          hotelId.value = null
        }
        filter.value = null
      })
    return { ...usedGetHotel, executeApi: () => execute({ params: filter.value }) }
  }

  // Get Hotels
  const getHotels = () => {
    if (['ADMIN', 'SUPPERADMIN'].includes(role.value)) {
      return getHotelAdmin()
    } else if (role.value === 'HOTELIER') {
      return getHotelPartner()
    }
  }

  // Set current hotel with hotelId from localstorage
  const getHotelLocalStore = () => {
    if (!hotelId.value || currentHotel.value) return
    filter.value = {
      id: hotelId.value
    }
    // Get hotel
    return getHotels()
  }

  // When ever hotelId change and not null -> get HotelLocalStore
  whenever(hotelId, async () => {
    const { executeApi } = getHotelLocalStore()
    executeApi()
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
