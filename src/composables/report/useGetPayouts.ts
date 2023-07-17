import { hotelsApi } from '@/apis/hotel'
import { calculatePaging } from '@/utils/paging'
import dayjs from 'dayjs'
const useGetPayouts = defineStore('report__useGetPayout', () => {
  const { hotelId } = useHotelStorage()
  // State & value
  const payouts = ref<IPayoutRequest[]>([])
  // server response paging
  const paging = ref<IResponsePaging>({
    offset: 0,
    page: 1,
    total_items: 0,
    total_pages: 1
  })
  // client request paging with filter
  const filter = ref<IRequestFilter>({
    page: 1,
    offset: 54,
    from: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    to: dayjs().format('YYYY-MM-DD')
  })
  // Client page
  const page = ref(1)
  // client paging
  const calculatedPaging = computed(() =>
    calculatePaging<IPayoutRequest>({
      offset: 6,
      page: page.value,
      server_offset: paging.value.offset,
      server_page: paging.value.page,
      serverData: payouts,
      total_items: paging.value.total_items
    })
  )

  function getPayoutsAdmin() {
    const usedGet = hotelsApi.getPayoutsAdmin(filter.value)

    const { execute, data } = usedGet

    // custom execute api
    const executeApi = async () => {
      try {
        // execute-> call api
        await execute({ params: filter.value })
        payouts.value = data.value.data
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

  function getPayoutsPartner() {
    const usedGet = hotelsApi.getPayoutsPartner(filter, hotelId.value)

    const { execute, data } = usedGet

    // custom execute api
    const executeApi = async () => {
      try {
        // execute-> call api
        await execute({ params: filter.value })
        payouts.value = data.value.data
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
    payouts,
    filter,
    calculatedPaging,
    page,
    getPayoutsPartner,
    getPayoutsAdmin
  }
})

export { useGetPayouts }
