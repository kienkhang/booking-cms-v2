import { roomsApi } from '@/apis/room'
import { useInventoryStore } from '@/stores'

interface UpsertRoomNight {
  room_type_id: string
  selected_date: string
  quantity: number
}
interface upsertRatePakage {
  data: { date: string; ratePlan: string; price: number }[]
}

const useMutateInventory = () => {
  // Hoosk from naive ui
  const mess = useMessage()
  // inventories state
  const { inventories } = storeToRefs(useInventoryStore())
  // get inventories from api
  const { getInventories } = useInventoryStore()
  // Get current month and year from useInventory
  const { month, year, room: roomId } = storeToRefs(useInventory())
  // computed -> inventory query request
  const query = computed(() => ({
    month: month.value,
    year: year.value
  }))
  // desctructuring inventory
  // const { executeApi: fetchInventories } = getInventories(inventoryQuery, roomId)

  // mutate room night
  const upsertRoomNight = () => {
    // Call api
    const usedUpsertRoomNight = roomsApi.upsertRoomNight({})
    // destructuring api
    const { execute } = usedUpsertRoomNight

    async function executeApi(form: UpsertRoomNight) {
      try {
        await execute({ data: form })
        getInventories(query, roomId).executeApi()
        mess.success('Cập nhật thành công')
      } catch (e) {
        mess.error('Cập nhật thất bại')
        throw new Error(e)
      }
    }

    return { ...usedUpsertRoomNight, executeApi }
  }
  // mutate rate package
  const upsertRatePakage = () => {
    // Call api
    const usedUpsertRatePakage = roomsApi.upsertRatePakage({})
    // destructuring api
    const { execute } = usedUpsertRatePakage

    async function executeApi(form: upsertRatePakage) {
      try {
        await execute({ data: form })
        getInventories(query, roomId).executeApi()
        mess.success('Cập nhật thành công')
      } catch (e) {
        mess.error('Cập nhật thất bại')
        throw new Error(e)
      }
    }

    return { ...usedUpsertRatePakage, executeApi }
  }

  return {
    inventories,
    query,
    roomId,
    upsertRatePakage,
    upsertRoomNight
    // fetchInventories
  }
}

export default useMutateInventory
