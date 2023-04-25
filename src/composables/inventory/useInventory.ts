import dayjs from 'dayjs'

const useInventory = () => {
  const room = ref<string | null>(null)
  const month = ref<number | null>(dayjs(useNow().value).month())
  const year = ref<number | null>(dayjs(useNow().value).year())

  const setMonth = (value: number) => (month.value = value)
  const setYear = (value: number) => (year.value = value)
  const setRoom = (value: string) => (room.value = value)

  return {
    room,
    month,
    year,
    setMonth,
    setYear,
    setRoom
  }
}
export default defineStore('inventory__useInventory', useInventory)
