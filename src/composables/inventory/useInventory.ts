import dayjs from 'dayjs'

type IMode = 'free' | 'dayOfWeek'
const useInventory = () => {
  // Get room type , month, year
  const room = ref<string | null>('roomtypeid1')
  const month = ref<number | null>(dayjs(useNow().value).month())
  const year = ref<number | null>(dayjs(useNow().value).year())
  // Mode select date
  const mode = ref<IMode>('free')
  const toggleMode = () => {
    if (mode.value === 'dayOfWeek') mode.value = 'free'
    else mode.value = 'dayOfWeek'
  }
  // Rate package or room night
  const adjustRate = ref(false)
  const toggleAdjustRate = () => (adjustRate.value = !adjustRate.value)
  // Select room type & rate package
  const selectedRoomNight = ref<
    {
      date: string
      roomType: string
      inventory: number
    }[]
  >([])
  const selectedRatePackage = ref<
    {
      date: string
      ratePlan: string
      price: number
    }[]
  >([])
  const exist = (date: string, target: any[]) => target.findIndex((i) => i.date === date) !== -1
  const selectRoomNight = ({ date, roomType }: { date: string; roomType: string }) => {
    if (adjustRate.value) return
    if (!exist(date, selectedRoomNight.value)) {
      console.log('khong ton tai room night')
      selectedRoomNight.value.push({
        date,
        roomType,
        inventory: 0
      })
      return
    }
    selectedRoomNight.value = selectedRoomNight.value.filter((d) => d.date !== date)
  }
  const selectRatePackage = ({ date, ratePlan }: { date: string; ratePlan: string }) => {
    if (!adjustRate.value) return

    if (!exist(date, selectedRatePackage.value)) {
      selectedRatePackage.value.push({
        date,
        ratePlan,
        price: 0
      })
      return
    }
    selectedRatePackage.value = selectedRatePackage.value.filter((d) => d.date !== date)
  }

  const setMonth = (value: number) => (month.value = value)
  const setYear = (value: number) => (year.value = value)
  const setRoom = (value: string) => (room.value = value)

  return {
    mode,
    room,
    month,
    year,
    selectedRoomNight,
    selectedRatePackage,
    adjustRate,
    setMonth,
    setYear,
    setRoom,
    toggleMode,
    toggleAdjustRate,
    selectRoomNight,
    selectRatePackage,
    exist
  }
}
export default defineStore('inventory__useInventory', useInventory)
