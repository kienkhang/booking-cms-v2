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
