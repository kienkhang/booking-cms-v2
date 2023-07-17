interface IReport {
  id: string
  created_at: string
  start_at: string
  end_at: string
  room_type_id: string
  room_type_name: string
  total_price: number
  commission_rate: number
  payment_status: string
  hotel_id: string
  hotel_name: string
  payout_status: string
}

interface ISummary {
  revenue: number
  paid_count: number
  unpaid_count: number
}

interface IPayoutRequest {
  id: string
  open_at: string
  close_at: string
  resolve: boolean
  total_request: number
  total_price: number
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
  pettioner_id: string
  pettioner: {
    id: string
    avatar: string
    email: string
    first_name: string
    last_name: string
    full_name: string
    phone: string
    gender: boolean
    role: string
    status: number
    user_key_firebase: string
    created_at: string
    updated_at: string
    user_rank: any
    wallet: any
  }
  payer_id: string
  payer?: {
    id: string
    avatar: string
    email: string
    first_name: string
    last_name: string
    full_name: string
    phone: string
    gender: boolean
    role: string
    status: number
    user_key_firebase: string
    created_at: string
    updated_at: string
    user_rank: any
    wallet: any
  }
  payment_list: string[]
}
