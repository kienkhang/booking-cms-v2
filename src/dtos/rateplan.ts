interface IRatePlan {
  id: string
  name: string
  type: string
  status: number
  activate: boolean
  free_breakfast: boolean
  free_lunch: boolean
  free_dinner: boolean
  room_type_id: string
  is_delete?: boolean
}
type IRatePlanAdd = Omit<IRatePlan, 'id'>
type IRatePlanUpdate = Omit<IRatePlan, 'id' | 'room_type_id'>
type IRatePlanDelete = Pick<IRatePlan, 'is_delete'>

export { IRatePlan, IRatePlanAdd, IRatePlanUpdate, IRatePlanDelete }
