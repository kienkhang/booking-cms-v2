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
  // district & province & ward
  district: number
  province: number
  ward: number
  bussiness_license: string
}

type IHotelAdd = Omit<IHotel, 'id'>
type IHotelUpdate = Omit<IHotel, 'id'>

export { IHotel, IHotelAdd, IHotelUpdate }
