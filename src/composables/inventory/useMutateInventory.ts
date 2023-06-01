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
  // inventories state
  const { inventories } = storeToRefs(useInventoryStore())
  // get inventories from api
  const { getInventories } = useInventoryStore()
  // Get current month and year from useInventory
  const { month, year, room: roomId } = storeToRefs(useInventory())
  // computed -> inventory query request
  const inventoryQuery = computed(() => ({
    month: month.value,
    year: year.value
  }))
  // desctructuring inventory
  // const { executeApi: fetchInventories } = getInventories(inventoryQuery, roomId)

  // mutate room night
  const upsertRoomNight = (form: Ref<UpsertRoomNight>) => {
    // Call api
    const usedUpsertRoomNight = roomsApi.upsertRoomNight(form.value)
    // destructuring api
    const { isFinished, execute, error } = usedUpsertRoomNight

    // whenever finished -> re get inventories
    whenever(isFinished, () => {
      if (!error.value) {
        getInventories(inventoryQuery, roomId).executeApi()
      }
    })
    return { ...usedUpsertRoomNight, executeApi: execute({ data: form.value }) }
  }
  // mutate rate package
  const upsertRatePakage = (form: Ref<upsertRatePakage>) => {
    // Call api
    const usedUpsertRatePakage = roomsApi.upsertRatePakage(form.value)
    // destructuring api
    const { isFinished, execute, error } = usedUpsertRatePakage

    // whenever finished -> re get inventories
    whenever(isFinished, () => {
      if (!error.value) {
        getInventories(inventoryQuery, roomId).executeApi()
      }
    })
    return { ...usedUpsertRatePakage, executeApi: execute({ data: form.value }) }
  }

  // Each month, year, room change -> fetch api get inventories
  watch([month, year, room], () => {
    // console.log('Thay đổi [month,year,room]')
    getInventories(inventoryQuery, roomId).executeApi()
  })

  return {
    inventories,
    upsertRatePakage,
    upsertRoomNight
    // fetchInventories
  }
}

export default useMutateInventory
