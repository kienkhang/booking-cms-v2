const path = 'rateplans'
// const admin = 'admin/'
class RatePlan {
  createRatePlan = (data: any | {}) => {
    const url = `${path}/`
    return usePost({ url, data, requiredToken: true })
  }
  updateRatePlan = (data: any | {}, rateplanId: string) => {
    const url = `${path}/${rateplanId}`
    return usePatch({ url, data, requiredToken: true })
  }
}

const rateplansApi = new RatePlan()

export { rateplansApi }
