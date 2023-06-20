import { roomsApi } from '@/apis/room'
import { IInventory } from '@/dtos/inventory'

const useInventoryStore = () => {
  const inventories = ref<IInventory>(null)

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
    }>,
    roomId: Ref<string>
  ) => {
    const usedGetInventories = roomsApi.getInventories(form.value, roomId.value)
    const { data, execute } = usedGetInventories

    async function executeApi() {
      try {
        await execute({ data: form.value })
        inventories.value = data.value
      } catch (e) {
        throw new Error(e)
      }
    }

    return { ...usedGetInventories, executeApi }
  }

  return {
    paging,
    filter,
    inventories,
    getInventories
  }
}

export default defineStore('inventory_store', useInventoryStore)
