const path = 'hotels'
const admin = 'admin'

interface UploadPhoto {
  images: FormData
  text: string
}
class Hotel {
  createHotel = (data: any | {}) => {
    const url = path
    return usePost({ url, data, requiredToken: true })
  }

  updateHotel = (data: any | {}, hotelId: string) => {
    const url = `${path}/${hotelId}`
    return usePatch({ url, data, requiredToken: true })
  }

  getHotels = (params: any | {}) => {
    const url = `${admin}/hotels`
    return useGet({ url, params, requiredToken: true })
  }

  acceptHotel = (data: any | {}, hotelId: string) => {
    const url = `${admin}/accept/${hotelId}`
    return usePatch({ url, data, requiredToken: true })
  }

  updateCmsrate = (data: any | {}, hotelId: string) => {
    const url = `${admin}/update-cmsrate/${hotelId}`
    return usePatch({ url, data, requiredToken: true })
  }

  updateRating = (data: any | {}, hotelId: string) => {
    const url = `${admin}/update-rating/${hotelId}`
    return usePatch({ url, data, requiredToken: true })
  }

  sendPayout = (data: any | {}, hotelId: string) => {
    const url = `${path}/${hotelId}/payout`
    return usePost({ url, data, requiredToken: true })
  }

  resolvePayout = (payoutId: string) => {
    const url = `${admin}/payouts/${payoutId}`
    return usePatch({
      url,
      data: {
        resolve: true
      },
      requiredToken: true
    })
  }

  getPayouts = (params: any | {}) => {
    const url = `${admin}/payouts`
    return useGet({ url, params, requiredToken: true })
  }

  getPayoutDetails = (params: any | {}, hotelId: string) => {
    const url = `${admin}/payouts/${hotelId}`
    return useGet({ url, params, requiredToken: true })
  }

  partnerGetHotel = (params: any | {}) => {
    const url = `${path}/`
    return useGet({ url, params, requiredToken: true })
  }

  getRoomsByHotel = (params: any | {}, hotelId: string) => {
    const url = `${path}/${hotelId}/rooms`
    return useGet({ url, params, requiredToken: true })
  }

  updatePhotos = (params: UploadPhoto | {}, hotelId: string) => {
    const url = `${path}/${hotelId}/photos`
    return usePatch({
      url,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  updateBL = (data: { images: File } | {}, hotelId: string) => {
    const url = `${path}/${hotelId}/business-license`
    return usePatch({
      url,
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      requiredToken: true
    })
  }

  getVouchers = (params: any | {}, hotelId: string) => {
    const url = `${path}/${hotelId}/vouchers`
    return useGet({ url, params, requiredToken: true })
  }

  getRevenue = (params: any | {}) => {
    const url = `${path}/revenue`
    return useGet({ url, params, requiredToken: true })
  }

  getPayoutsPartner = (params: any | {}, hotelId: string) => {
    const url = `${path}/payouts/${hotelId}`
    return useGet({
      url,
      requiredToken: true
    })
  }

  getPayoutsAdmin = (params: any | {}) => {
    const url = `${admin}/payouts`
    return useGet({
      url,
      params,
      requiredToken: true
    })
  }
}

const hotelsApi = new Hotel()

export { hotelsApi }
