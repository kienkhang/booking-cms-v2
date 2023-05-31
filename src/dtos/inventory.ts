interface IInventory {
  roomnights: RoomNight[]
  rateplans: RatePlan[]
}

interface RoomNight {
  id: string
  availability_at: string
  quantity: number
}

interface RatePlan {
  rateplan_id: string
  prices: Price[]
}

interface Price {
  id: string
  availability_at: string
  price: number
}

export { IInventory }
