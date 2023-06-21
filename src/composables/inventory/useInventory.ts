import dayjs from 'dayjs'
import _some from 'lodash-es/some'
import _remove from 'lodash-es/remove'
type IMode = 'free' | 'dayOfWeek'
const useInventory = () => {
  // Get room type , month, year
  const room = ref<string | null>('')
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
  const rateplan = ref('')
  const { ratePlans } = useRatePlan()
  whenever(ratePlans, () => {
    rateplan.value = ratePlans.value[0]?.id
  })
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
  // Check exist RoomNight with date & roomtype
  const existRoomNight = (date: string, roomType: string) => {
    return _some(selectedRoomNight.value, { date, roomType })
  }
  // Check exist RatePackage with date & rateplan
  const existRatePackage = (date: string, ratePlan: string) => {
    return _some(selectedRatePackage.value, { date, ratePlan })
  }
  // select room night
  const selectRoomNight = ({ date, roomType }: { date: string; roomType: string }) => {
    // If adjusting rate -> return
    if (adjustRate.value) return
    // check exist && toggle
    if (!existRoomNight(date, roomType)) {
      selectedRoomNight.value.push({
        date,
        roomType,
        inventory: 0
      })
      return
    }
  }
  // remove room night
  const removeRoom = ({ date, roomType }: { date: string; roomType: string }) => {
    _remove(selectedRoomNight.value, (rp) => {
      return rp.date === date && rp.roomType === roomType
    })
  }

  // select rate package
  const selectRate = ({ date, ratePlan }: { date: string; ratePlan: string }) => {
    // if adjusting room night -> return
    if (!adjustRate.value) return
    // check exist && toggle
    if (!existRatePackage(date, ratePlan)) {
      selectedRatePackage.value.push({
        date,
        ratePlan,
        price: 0
      })
      return
    }
  }
  // remove rate package
  const removeRate = ({ date, ratePlan }: { date: string; ratePlan: string }) => {
    _remove(selectedRatePackage.value, (rp) => {
      return rp.date === date && rp.ratePlan === ratePlan
    })
  }

  const setMonth = (value: number) => (month.value = value)
  const setYear = (value: number) => (year.value = value)
  const setRoom = (value: string) => (room.value = value)

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
    removeRoom,
    removeRate,
    existRoomNight,
    existRatePackage
  }
}
export default defineStore('inventory__useInventory', useInventory)
