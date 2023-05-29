const path = 'rooms/'
// const admin = 'admin/'
class Room {
  createRoom = (data: any | {}) => {
    const url = path
    return usePost({ url, data, requiredToken: true })
  }
  updateRoom = (data: any | {}, roomId: string) => {
    const url = path + roomId
    return usePatch({ url, data, requiredToken: true })
  }
  getDetails = (roomId: string) => {
    const url = `${path}${roomId}`
    return useGet({ url, requiredToken: true })
  }
  createRoomNight = (data: any | {}) => {
    const url = path + 'roomnights'
    return usePost({ url, data, requiredToken: true })
  }
  createRatePakage = (data: any | {}) => {
    const url = path + 'ratepackages'
    return usePost({ url, data, requiredToken: true })
  }
  getInventories = (params: any | {}, roomId: string) => {
    const url = path + `${roomId}/inventories`
    return useGet({ url, params, requiredToken: true })
  }
  getRatePlans = (params: any | {}, roomId: string) => {
    const url = path + `${roomId}/rateplans`
    return useGet({ url, params, requiredToken: true })
  }
}

const roomsApi = new Room()

export { roomsApi }
