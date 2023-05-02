import type { IRatePackageCell, IRoomNightCell } from '@/dtos/shared'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

const roomnights: IRoomNightCell[] = [
  {
    id: 'e020a11e-8e5f-4c0b-8e9f-3457a699f7b7',
    availability_at: '2023-04-01',
    quantity: 5
  },
  {
    id: 'a758d371-7ebc-41cf-b0b0-33db878df062',
    availability_at: '2023-06-12',
    quantity: 5
  },
  {
    id: '072222a2-3939-47f6-9391-d2c84df82456',
    availability_at: '2023-04-19',
    quantity: 5
  },
  {
    id: '46108a52-4e4c-44fe-9388-45f46b1b5522',
    availability_at: '2023-08-27',
    quantity: 5
  }
]
const ratepackages: IRatePackageCell[] = [
  {
    id: 'e020a11e-8e5f-4c0b-8e9f-3457a699f7b7',
    availability_at: '2023-04-01',
    price: 500000
  },
  {
    id: 'a758d371-7ebc-41cf-b0b0-33db878df062',
    availability_at: '2023-06-12',
    price: 500000
  },
  {
    id: '072222a2-3939-47f6-9391-d2c84df82456',
    availability_at: '2023-04-19',
    price: 500000
  },
  {
    id: '46108a52-4e4c-44fe-9388-45f46b1b5522',
    availability_at: '2023-08-27',
    price: 500000
  }
]

// -------------------------- FILTER AND RENDER LIST ------------------------
// Params to render function (year, month, roomnight)
const renderRoomNights = (
  realYear: number,
  realMonth: number,
  roomNight: IRoomNightCell[]
): IRoomNightCell[] => {
  // Calculate days in month
  const dayOfMonth = dayjs().year(realYear).month(realMonth).daysInMonth()
  // Get first date follow month and year
  const firstDate = dayjs().year(realYear).month(realMonth).date(1)
  // Get last date follow month and year
  const lastDate = dayjs().year(realYear).month(realMonth).date(dayOfMonth)

  // Filter list roomnight is between first and last month
  const filteredRoomNight = roomNight.filter((rn) =>
    dayjs(rn.availability_at).isBetween(firstDate, lastDate, 'year', '[]')
  )
  // Create empty array, loop from first -> last month then fill cell
  // Each cell contain -> date(YYY-MM-DD), id and quanity
  const renderSource = []
  for (let i = 1; i <= dayOfMonth; i++) {
    const formatted = dayjs().year(realYear).month(realMonth).date(i).format('YYYY-MM-DD')
    renderSource[i - 1] = {
      id: crypto.randomUUID(),
      availability_at: formatted,
      quantity: 0
    }
  }
  // Sau đó dựa vào room night đã trả về từ API, tính toán xem có ngày nào trùng không, nếu có thì thay thế, để có dữ liệu
  const calculateSource = renderSource.map((cell) => {
    const rn = filteredRoomNight.find((r) => r.availability_at === cell.availability_at)
    // Nếu rn tồn tại, tức là có ngày đó trong mảng thì thay cả phần tử đó lun
    if (rn) {
      return rn
    }
    // Không thì return cell luôn
    return cell
  })
  return calculateSource
}
// Params to render function (year, month, ratepackage)
const renderRatePakages = (
  realYear: number,
  realMonth: number,
  ratePackage: IRatePackageCell[]
): IRatePackageCell[] => {
  // Calculate days in month
  const dayOfMonth = dayjs().year(realYear).month(realMonth).daysInMonth()
  // Get first date follow month and year
  const firstDate = dayjs().year(realYear).month(realMonth).date(1)
  // Get last date follow month and year
  const lastDate = dayjs().year(realYear).month(realMonth).date(dayOfMonth)

  // Filter list roomnight is between first and last month
  const filteredRoomNight = ratePackage.filter((rn) =>
    dayjs(rn.availability_at).isBetween(firstDate, lastDate, 'year', '[]')
  )
  // Create empty array, loop from first -> last month then fill cell
  // Each cell contain -> date(YYY-MM-DD), id and price
  const renderSource = []
  for (let i = 1; i <= dayOfMonth; i++) {
    const formatted = dayjs().year(realYear).month(realMonth).date(i).format('YYYY-MM-DD')
    renderSource[i - 1] = {
      id: crypto.randomUUID(),
      availability_at: formatted,
      price: 0
    }
  }
  // Then based-on room night data from api, fill data to cell if the date is the same
  const calculatedSource = renderSource.map((cell) => {
    // find cell matched data
    const rn = filteredRoomNight.find((r) => r.availability_at === cell.availability_at)
    // if rn exist -> assign data to this cell
    if (rn) {
      return rn
    }
    // else return cell
    return cell
  })
  // return array after calculate
  return calculatedSource
}

// render calendar
const renderCalendar = (realYear: number, realMonth: number) => {
  // Calculate days in month
  const dayOfMonth = dayjs().year(realYear).month(realMonth).daysInMonth()

  // Create empty array, loop from first -> last month then fill cell
  // Each cell contain -> date(YYY-MM-DD), short date(DD), day of week (ddd)
  const renderSource = []
  for (let i = 1; i <= dayOfMonth; i++) {
    const d = dayjs().year(realYear).month(realMonth).date(i)
    const fullDate = d.format('YYYY-MM-DD')
    const date = d.format('DD')
    const dayOfWeek = d.format('ddd')

    renderSource[i - 1] = {
      id: crypto.randomUUID(),
      fullDate,
      date,
      dayOfWeek
    }
  }
  return renderSource
}

// -------------------------- SELECT FOLLOW DAY OF WEEK ------------------------

// Day of week is : [0 1 2 3 4 5 6]
const selectMultipleDate = (dayOfWeek: number, month: number, year: number) => {
  // DEFINE: firstSpecialDayOfTheMonth : f
  if (dayOfWeek > 6 || dayOfWeek < 0) return
  // Array contain special dayOfWeek in month
  const specialDays: string[] = []
  // Get month
  // Get first special day of the month
  let f = dayjs().year(year).month(month).startOf('month').day(dayOfWeek)
  // if value first special of the month > 7, its not a first day, its a last day of the previous month
  if (f.date() > 7) {
    f = f.add(7, 'd')
  }
  // Compare f'month with set(month+year).month -> while add

  while (f.month() === dayjs().year(year).month(month).month()) {
    specialDays.push(f.format('YYYY-MM-DD'))
    f = f.add(7, 'd')
  }
  return specialDays
}
// console.log('🐔🦢 ~ selectMultipleDate:', selectMultipleDate(2, 3, 2023))
// selectMultipleDate(2, 3, 2021)

export {
  renderCalendar,
  renderRatePakages,
  renderRoomNights,
  selectMultipleDate,
  roomnights,
  ratepackages
}
