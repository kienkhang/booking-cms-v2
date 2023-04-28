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
  // rateplan choosen when select rate in dayOfWeek mode
  const rateplan = ref('rateplan1')
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
  // check exist room room night or rate pakage
  const exist = (date: string, target: any[]) => target.findIndex((i) => i.date === date) !== -1
  // select room night
  const selectRoomNight = ({ date, roomType }: { date: string; roomType: string }) => {
    // If adjusting rate -> return
    if (adjustRate.value) return
    // check exist && toggle
    if (!exist(date, selectedRoomNight.value)) {
      selectedRoomNight.value.push({
        date,
        roomType,
        inventory: 0
      })
      return
    }
  }
  const removeSelected = (date: string, target: Ref<any[]>) => {
    target.value = target.value.filter((d) => d.date !== date)
  }
  // select rate package
  const selectRate = ({ date, ratePlan }: { date: string; ratePlan: string }) => {
    // if adjusting room night -> return
    if (!adjustRate.value) return
    // check exist && toggle
    if (!exist(date, selectedRatePackage.value)) {
      selectedRatePackage.value.push({
        date,
        ratePlan,
        price: 0
      })
      return
    }
  }

  const setMonth = (value: number) => (month.value = value)
  const setYear = (value: number) => (year.value = value)
  const setRoom = (value: string) => (room.value = value)

  // if mode change [ free or dayOfWeek ] -> reset all selected
  watch([mode], () => {
    selectedRatePackage.value = []
    selectedRoomNight.value = []
  })

  return {
    mode,
    room,
    rateplan,
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
    selectRate,
    removeSelected,
    exist
  }
}
export default defineStore('inventory__useInventory', useInventory)
