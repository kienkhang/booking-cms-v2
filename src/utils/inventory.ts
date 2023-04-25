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

// filter list theo năm tháng

// Hàm truyền vào bao gồm (year, month, roomnight)
const renderRoomNights = (
  realYear: number,
  realMonth: number,
  roomNight: IRoomNightCell[]
): IRoomNightCell[] => {
  // Tính số ngày trong tháng
  const dayOfMonth = dayjs().year(realYear).month(realMonth).daysInMonth()
  // Lấy ngày đầu tiên của tháng đó, năm đó
  const firstDate = dayjs().year(realYear).month(realMonth).date(1)
  // Lấy ngày cuối cùng của tháng đó, năm đó
  const lastDate = dayjs().year(realYear).month(realMonth).date(dayOfMonth)

  // Filter lại list roomnight có ngày giữa đầu tháng và cuối tháng
  const filteredRoomNight = roomNight.filter((rn) =>
    dayjs(rn.availability_at).isBetween(firstDate, lastDate, 'year', '[]')
  )
  // Tạo ra một mảng trống, sau đó loop từ đầu đến cuối tháng để render ra mảng dữ liệu tạm thời
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
    if (!!rn) {
      return rn
    }
    // Không thì return cell luôn
    return cell
  })
  return calculateSource
}
// Hàm truyền vào bao gồm (year, month, ratepackage)
const renderRatePakages = (
  realYear: number,
  realMonth: number,
  ratePackage: IRatePackageCell[]
): IRatePackageCell[] => {
  // Tính số ngày trong tháng
  const dayOfMonth = dayjs().year(realYear).month(realMonth).daysInMonth()
  // Lấy ngày đầu tiên của tháng đó, năm đó
  const firstDate = dayjs().year(realYear).month(realMonth).date(1)
  // Lấy ngày cuối cùng của tháng đó, năm đó
  const lastDate = dayjs().year(realYear).month(realMonth).date(dayOfMonth)

  // Filter lại list roomnight có ngày giữa đầu tháng và cuối tháng
  const filteredRoomNight = ratePackage.filter((rn) =>
    dayjs(rn.availability_at).isBetween(firstDate, lastDate, 'year', '[]')
  )
  // Tạo ra một mảng trống, sau đó loop từ đầu đến cuối tháng để render ra mảng dữ liệu tạm thời
  const renderSource = []
  for (let i = 1; i <= dayOfMonth; i++) {
    const formatted = dayjs().year(realYear).month(realMonth).date(i).format('YYYY-MM-DD')
    renderSource[i - 1] = {
      id: crypto.randomUUID(),
      availability_at: formatted,
      price: 0
    }
  }
  // Sau đó dựa vào room night đã trả về từ API, tính toán xem có ngày nào trùng không, nếu có thì thay thế, để có dữ liệu
  const calculateSource = renderSource.map((cell) => {
    const rn = filteredRoomNight.find((r) => r.availability_at === cell.availability_at)
    // Nếu rn tồn tại, tức là có ngày đó trong mảng thì thay cả phần tử đó lun
    if (!!rn) {
      return rn
    }
    // Không thì return cell luôn
    return cell
  })
  return calculateSource
}

// render calendar
const renderCalendar = (realYear: number, realMonth: number) => {
  // Tính số ngày trong tháng
  const dayOfMonth = dayjs().year(realYear).month(realMonth).daysInMonth()

  // Tạo ra một mảng trống, sau đó loop từ đầu đến cuối tháng để render ra mảng dữ liệu tạm thời
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

export { renderCalendar, renderRatePakages, renderRoomNights, roomnights, ratepackages }
