import { roomsApi } from '@/apis/room'
import type { IRatePlan } from '@/dtos'

const useRatePlanStore = () => {
  const ratePlans = ref<IRatePlan[]>([])

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

  const getRatePlans = (roomId: string) => {
    const usedGetRatePlans = roomsApi.getRatePlans(filter.value, roomId)

    const { data, isFinished, execute, error } = usedGetRatePlans

    // whenever finished && not error -> set rateplans and paging
    whenever(isFinished, () => {
      if (!error.value) {
        ratePlans.value = data.value.data
        paging.value = data.value.paging
      }
    })
    return { ...usedGetRatePlans, executeApi: () => execute({ params: filter.value }) }
  }

  return {
    paging,
    filter,
    ratePlans,
    getRatePlans
  }
}

export default defineStore('rateplan_store', useRatePlanStore)
