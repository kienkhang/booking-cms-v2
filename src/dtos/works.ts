import { IHotel } from './hotel'

interface IWorks {
  user_id: string
  hotels: IHotel[]
}
type IWorkAdd = { hotel_id: string; user_id: string }

export { IWorks, IWorkAdd }
