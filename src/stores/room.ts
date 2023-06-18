import { hotelsApi } from '@/apis/hotel'
import { roomsApi } from '@/apis/room'
import { IRoom } from '@/dtos'

const useRoomStore = () => {
  const { hotelId } = useHotelStorage()
  // List hotel with paging
  const rooms = ref<IRoom[]>([])
  const roomCount = computed(() => rooms.value?.length)

  const currentRoom = ref<IRoom>(null)

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
  // client filter
  const filter = ref<{
    offset?: number
    page?: number
    [filter: string]: any
  }>()

  // Select Hotel to manipulates
  const setCurrentRoom = (room: IRoom) => {
    currentRoom.value = room
  }

  // Get hotel with role partner (hotelier | manager | staff)
  const getRooms = () => {
    const usedGetRoom = hotelsApi.getRoomsByHotel(filter.value, hotelId.value)
    const { data, error, isFinished } = usedGetRoom
    // Execute get hotel
    // roomCount.value <= 0 && usedGetRoom.execute()
    // After get data ->  save global state && reset filter to null
    // Response is <data:{ data:[], paging:{}}>
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (!error.value) {
          // Set room & paging
          rooms.value = data.value.data
          paging.value = data.value.paging
          // Reset filter
          filter.value = null
        }
      })
    return {
      ...usedGetRoom,
      // Execute get hotel if not rooms
      executeApi: () => usedGetRoom.execute()
    }
  }

  const getRoomById = (roomId: string) => {
    const usedGetRoom = roomsApi.getDetails(roomId)
    const { data, error, isFinished } = usedGetRoom

    // After get data ->  save global state && reset paging to null
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (!error.value) {
          currentRoom.value = data.value
        }
      })

    return {
      ...usedGetRoom,
      // Execute get hotel if not current room
      executeApi: () => {
        usedGetRoom.execute()
      }
    }
  }

  return {
    rooms,
    roomCount,
    paging,
    filter,
    setCurrentRoom,
    currentRoom,
    getRooms,
    getRoomById
  }
}

export default defineStore('rooms_store', useRoomStore)
