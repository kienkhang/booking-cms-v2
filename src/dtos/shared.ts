interface IFormKitFile {
  name: string
  file: File
}

interface IDateCell {
  id: string
  fullDate: string
  date: string
  dayOfWeek: string
}

interface IRoomNightCell {
  id: string
  availability_at: string
  quantity: number
}
interface IRatePackageCell {
  id: string
  availability_at: string
  price: number
}

export { IFormKitFile, IDateCell, IRoomNightCell, IRatePackageCell }
