import { roomsApi } from '@/apis/room'
import { IInventory } from '@/dtos/inventory'

const useInventoryStore = () => {
  const { currentRoom } = useRoom()
  const roomId = computed(() => currentRoom.value.id)
  const inventories = ref<IInventory[]>([])

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

  const getInventories = (
    form: Ref<{
      month: number
      year: number
    }>
  ) => {
    const usedGetInventories = roomsApi.getInventories(form.value, roomId.value)
    const { data, execute, isFinished, error } = usedGetInventories

    whenever(isFinished, () => {
      if (!error.value) {
        inventories.value = data.value.data
      }
    })
    return { ...usedGetInventories, executeApi: () => execute({ params: form.value }) }
  }

  return {
    paging,
    filter,
    inventories,
    getInventories
  }
}

export default defineStore('inventory_store', useInventoryStore)
