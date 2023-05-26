import { rateplansApi } from '@/apis/rateplan'
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

  const getRatePlans = () => {
    // const usedGetRatePlans = rateplansApi
  }

  return {
    ratePlans,
    paging,
    filter
  }
}

export default defineStore('rateplan_store', useRatePlanStore)
