const path = 'admin/works'
class Works {
  getHotelWorks = (userId: string) => {
    const url = `${path}/${userId}`
    return useGet({ url, requiredToken: true })
  }
  createHotelWork = (data: any | {}) => {
    const url = `${path}`
    return usePost({ url, data, requiredToken: true })
  }
  deleteHotelWork = (data: any | {}) => {
    const url = `${path}`
    return useDelete({ url, data, requiredToken: true })
  }
}

const workApis = new Works()

export { workApis }
