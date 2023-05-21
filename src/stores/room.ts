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
    const usedGetRoom = hotelsApi.getRoomsByHotel(paging.value, hotelId.value)
    const { data, error, isFinished } = usedGetRoom
    // Execute get hotel
    roomCount.value <= 0 && usedGetRoom.execute()
    // After get data ->  save global state && reset paging to null
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (!error.value) {
          rooms.value = data.value
          paging.value = null
        }
      })
    return usedGetRoom
  }

  const getRoomById = (roomId: string) => {
    const usedGetRoom = roomsApi.getDetails(roomId)
    const { data, error, isFinished } = usedGetRoom
    // Execute get hotel
    currentRoom.value && usedGetRoom.execute()
    // After get data ->  save global state && reset paging to null
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (!error.value) {
          currentRoom.value = data.value
          paging.value = null
        }
      })

    return usedGetRoom
  }

  return {
    rooms,
    roomCount,
    setCurrentRoom,
    currentRoom,
    getRooms,
    getRoomById
  }
}

export default defineStore('rooms_store', useRoomStore)
