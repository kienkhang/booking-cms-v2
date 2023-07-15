import { hotelsApi } from '@/apis/hotel'
import { calculatePaging } from '@/utils/paging'

const useVoucherStore = defineStore('store__voucher', () => {
  // State & value
  const vouchers = ref<IVoucher[]>([])
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
    offset: 54
  })
  // Client page
  const page = ref(1)
  // client paging
  const calculatedPaging = computed(() =>
    calculatePaging({
      offset: 6,
      page: page.value,
      server_offset: paging.value.offset,
      server_page: paging.value.page,
      serverData: vouchers,
      total_items: paging.value.total_items
    })
  )

  // Get bookings history
  function getVouchers(hotelId: string) {
    const usedGet = hotelsApi.getVouchers(filter, hotelId)
    // destructuring axios delete
    const { execute, data } = usedGet
    // custom execute api
    const executeApi = async () => {
      try {
        // execute-> call api
        await execute({ params: filter.value })
        vouchers.value = data.value.data
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

  return {
    filter,
    paging,
    vouchers,
    calculatedPaging,
    getVouchers
  }
})

export { useVoucherStore }
