import { voucherApi } from '@/apis/voucher'

function useVoucher() {
  const { hotelId } = useHotelStorage()
  // Get voucher
  const { getVouchers } = useVoucherStore()
  const { executeApi: fetchVouchers } = getVouchers(hotelId.value)

  function createVoucher(form: Ref<{} | any>) {
    const usedCreate = voucherApi.create(form)

    const { execute } = usedCreate
    async function callCreate(format: any) {
      try {
        await execute({ data: format })
        fetchVouchers()
      } catch (error) {
        throw error
      }
    }
    return {
      ...usedCreate,
      callCreate
    }
  }

  function updateVoucher(form: Ref<{} | any>, voucherId: string) {
    const usedUpdate = voucherApi.update(form, voucherId)

    const { execute } = usedUpdate
    async function callUpdate(format: any) {
      try {
        await execute({ data: format })
        fetchVouchers()
      } catch (error) {
        throw error
      }
    }
    return {
      ...usedUpdate,
      callUpdate
    }
  }

  return {
    createVoucher,
    updateVoucher
  }
}

export { useVoucher }
