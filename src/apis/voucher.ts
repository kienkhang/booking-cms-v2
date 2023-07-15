const path = 'vouchers'
// const admin = 'admin/'
class Voucher {
  create = (data: any | {}) => {
    const url = `${path}/`
    return usePost({ url, data, requiredToken: true })
  }
  update = (data: any | {}, voucherId: string) => {
    const url = `${path}/${voucherId}`
    return usePatch({ url, data, requiredToken: true })
  }
}

const voucherApi = new Voucher()

export { voucherApi }
