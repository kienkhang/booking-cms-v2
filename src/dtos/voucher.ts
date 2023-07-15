interface IVoucher {
  id: string
  name: string
  activated: boolean
  begin_at: string
  end_at: string
  code: string
  discount: number
  created_at: string
  updated_at: string
  hotel_id: string
  hotel: {
    id: string
    name: string
    overview: string
    rating: number
    commission_rate: number
    created_at: string
    updated_at: string
    status: number
    activate: boolean
    province_code: number
    district_code: number
    ward_code: number
    raw_address: string
    hotel_photos: string
    bank_account: string
    bank_beneficiary: string
    bank_name: string
    business_licence: string
    hotelier_id: string
    price_hotel: number
    discount_price: number
    discount_hotel: number
    room_types: any
  }
  excepts: any[]
}
