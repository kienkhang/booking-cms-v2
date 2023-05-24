import { roomsApi } from '@/apis/room'
import type { IRoom } from '@/dtos'

function useRoom() {
  // Import naive ui message
  const message = useMessage()
  // Import state from store
  const { rooms, currentRoom, roomCount, filter, paging } = storeToRefs(useRoomStore())
  // Import actions from store
  const { getRooms } = useRoomStore()

  // Create room
  function createRoom(form: Ref<Omit<IRoom, 'id' | 'photos'>>) {
    const usedCreateRoom = roomsApi.createRoom(form)
    const { isFinished, error, execute } = usedCreateRoom

    // until isFinished => getRoom and show message
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (!error.value) {
          getRooms()
          message.success('Tạo khách sạn thành công')
          return
        }
        message.success('Tạo khách sạn thất bại')
      })
    // Return all field useAxios
    return {
      ...usedCreateRoom,
      executeApi: () => execute({ data: { ...form.value } })
    }
  }
  // Update room
  function updateRoom(form: Ref<Omit<IRoom, 'id' | 'photos'>>, roomId: string) {
    const usedUpdateRoom = roomsApi.updateRoom(form, roomId)
    const { isFinished, error, execute } = usedUpdateRoom

    // until isFinished => show message
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        if (!error.value) {
          message.success('Cập nhật khách sạn thành công')
          return
        }
        message.success('Cập nhật khách sạn thất bại')
      })

    return {
      ...usedUpdateRoom,
      executeApi: () => execute({ data: { ...form.value } })
    }
  }

  return {
    rooms,
    currentRoom,
    roomCount,
    paging,
    filter,
    createRoom,
    updateRoom
  }
}
export default useRoom
