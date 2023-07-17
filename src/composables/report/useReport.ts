import { hotelsApi } from '@/apis/hotel'
import { calculatePaging } from '@/utils/paging'
import dayjs from 'dayjs'

const useReport = defineStore('__useReport', () => {
  const { hotelId } = useHotelStorage()
  // State & value
  const reports = ref<IReport[]>([])
  const summary = ref<ISummary>({
    paid_count: 0,
    revenue: 0,
    unpaid_count: 0
  })
  // server response paging
  const paging = ref<IResponsePaging>({
    offset: 0,
    page: 1,
    total_items: 0,
    total_pages: 1
  })
  // client request paging with filter
  const filter = ref<IRequestFilter>({
    id: hotelId.value,
    page: 1,
    offset: 54,
    from: dayjs('2023-07-01').format('YYYY-MM-DD'),
    to: dayjs().format('YYYY-MM-DD')
  })
  // Client page
  const page = ref(1)
  // client paging
  const calculatedPaging = computed(() =>
    calculatePaging<IReport>({
      offset: 6,
      page: page.value,
      server_offset: paging.value.offset,
      server_page: paging.value.page,
      serverData: reports,
      total_items: paging.value.total_items
    })
  )

  function getReports() {
    const usedGet = hotelsApi.getRevenue(filter.value)

    const { execute, data } = usedGet

    // custom execute api
    const executeApi = async () => {
      try {
        // execute-> call api
        await execute()
        reports.value = data.value.data
        summary.value = data.value.summary
        paging.value = data.value.paging
        // push log
      } catch (e: any) {
        // push log

        throw new Error(e)
      }
    }

    return {
      ...usedGet,
      executeApi
    }
  }

  watch(hotelId, () => {
    filter.value.id = hotelId.value
  })

  return {
    reports,
    summary,
    filter,
    calculatedPaging,
    page,
    getReports
  }
})

export { useReport }
