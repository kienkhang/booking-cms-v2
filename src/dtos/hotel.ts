interface IHotel {
  // Basic
  hotelier_id: string
  id: string
  name: string
  overview: string
  activate: boolean
  hotel_photos: string
  raw_address: string
  bank_account: string
  bank_name: string
  bank_beneficiary: string
  // Additional & Hotel Type
  hotel: boolean
  apartment: boolean
  resort: boolean
  villa: boolean
  camping: boolean
  motel: boolean
  homestay: boolean
  beach: boolean
  pool: boolean
  bar: boolean
  no_smoking_room: boolean
  fitness: boolean
  bath: boolean
  wifi: boolean
  breakfast: boolean
  casio: boolean
  parking: boolean
  spa: boolean
  // district & province & ward
  district: number
  province: number
  ward: number
  business_licence: string
  // Rating and comission rate
  rating: number
  commission_rate: number
  // Facilities
  hotel_facility?: {
    bar: boolean
    bath: boolean
    beach: boolean
    breakfast: boolean
    casino: boolean
    fitness: boolean
    hotel_id: string
    no_smoking_room: boolean
    parking: boolean
    pool: boolean
    spa: boolean
    wifi: boolean
  }
  // Hotel Type
  hotel_type?: {
    apartment: boolean
    camping: boolean
    homestay: boolean
    hotel: true
    hotel_id: string
    motel: boolean
    resort: boolean
    villa: boolean
  }
}

type IHotelAdd = Omit<IHotel, 'id' | 'hotel_photos' | 'business_licence'>
type IHotelUpdate = Omit<IHotel, 'id' | 'hotel_photos' | 'business_licence'>

export { IHotel, IHotelAdd, IHotelUpdate }
