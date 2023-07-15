import { voucherApi } from '@/apis/voucher'

function useVoucher() {
  function createVoucher(form: Ref<{} | any>) {
    const usedCreate = voucherApi.create(form)

    const { execute } = usedCreate
    async function callCreate(format: any) {
      try {
        await execute({ data: format })
      } catch (error) {
        throw error
      }
    }
    return {
      ...usedCreate,
      callCreate
    }
  }

  return {
    createVoucher
  }
}

export { useVoucher }
