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

  // }
  function selectHotelGetter() {
    if (['ADMIN', 'SUPPERADMIN'].includes(role.value)) {
      return hotelsApi.getHotels(filter.value)
    } else if (role.value === 'HOTELIER') {
      return hotelsApi.partnerGetHotel(filter.value)
    }
  }

  function getHotels() {
    const usedGetHotel = selectHotelGetter()

    if (usedGetHotel) {
      const { execute, data } = usedGetHotel

      return {
        ...usedGetHotel,
        executeApi: async () => {
          try {
            await execute({ params: filter.value })
            // biding data
            hotels.value = data.value.data
            paging.value = data.value.paging
            // reset filter
            filter.value = null
          } catch (e) {
            throw e
          }
        }
      }
    } else {
      return null
    }
  }

  // Set current hotel with hotelId from localstorage
  async function getHotelLocalStore() {
    if (!hotelId.value || currentHotel.value) return
    filter.value = {
      id: hotelId.value
    }
    // Get hotel
    const usedGetHotel = getHotels()

    if (usedGetHotel) {
      const { executeApi } = usedGetHotel
      try {
        await executeApi()
        setCurrentHotel(hotels.value[0])
      } catch (e) {
        console.log(e)
        throw e
      }
    }

    // if (['ADMIN', 'SUPPERADMIN'].includes(role.value)) {
    //   await getHotelAdmin().executeApi()
    //   setCurrentHotel(hotels.value[0])
    // } else if (role.value === 'HOTELIER') {
    //   await getHotelPartner().executeApi()
    //   setCurrentHotel(hotels.value[0])
    // }
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
    getHotelLocalStore,
    setCurrentHotel,
    getHotels
  }
}

export default defineStore('hotels_store', useHotelStore)
