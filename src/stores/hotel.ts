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
    const { data, error, isFinished } = usedGetHotel

    // usedGetHotel.execute({ params: filter.value })
    whenever(isFinished, () => {
      if (!error.value) {
        // After get hotel & not error -> save global state
        // Response is <data:{ data:[], paging:{}}>
        hotels.value = data.value.data
        paging.value = data.value.paging
      }
      filter.value = null
    })
    return { ...usedGetHotel, executeApi: () => usedGetHotel.execute({ params: filter.value }) }
  }
  // Get hotel with role partner (hotelier | manager | staff)
  const getHotelPartner = () => {
    const usedGetHotel = hotelsApi.partnerGetHotel(filter.value)
    const { data, error, isFinished } = usedGetHotel

    // After get data -> reset paging to null
    // usedGetHotel.execute({ params: filter.value })
    whenever(isFinished, () => {
      if (!error.value) {
        // After get hotel & not error -> save global state
        // Response is <data:{ data:[], paging:{}}>
        hotels.value = data.value.data
        paging.value = data.value.paging
      }
      filter.value = null
    })
    return { ...usedGetHotel, executeApi: () => usedGetHotel.execute({ params: filter.value }) }
  }

  // Get Hotels
  const getHotels = () => {
    const usedGetHotelAdmin = getHotelAdmin()
    const usedGetHotelPartner = getHotelPartner()
    if (['ADMIN', 'SUPPERADMIN'].includes(role.value)) {
      return { ...usedGetHotelAdmin }
    } else if (role.value === 'HOTELIER') {
      return { ...usedGetHotelPartner }
    }
  }

  // Set current hotel with hotelId from localstorage
  const getHotelLocalStore = async () => {
    if (!hotelId.value || currentHotel.value) return
    filter.value = {
      id: hotelId.value
    }
    // Get hotel

    if (['ADMIN', 'SUPPERADMIN'].includes(role.value)) {
      await getHotelAdmin().executeApi()
      setCurrentHotel(hotels.value[0])
    } else if (role.value === 'HOTELIER') {
      await getHotelPartner().executeApi()
      setCurrentHotel(hotels.value[0])
    }
  }

  // When ever hotelId change and not null -> get HotelLocalStore
  whenever(hotelId, async () => {
    await getHotelLocalStore()
    // executeApi()
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
