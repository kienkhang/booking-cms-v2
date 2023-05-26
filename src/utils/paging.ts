interface IClientPaging<T> {
  data: T[]
  total_pages: number
  start: number
  end: number
  page: number
  offset: number
}
const calculatePaging = <T>({
  offset,
  page,
  sData,
  total_items
}: {
  page: number
  offset: number
  total_items: number
  sData: T[]
}): IClientPaging<T> => {
  const total_pages = computed(() => Math.ceil(total_items / offset))
  const start = computed(() => (page - 1) * offset)
  const end = computed(() => page * offset)
  const data = computed(() => sData.slice(start.value, end.value))

  return {
    data: data.value,
    total_pages: total_pages.value,
    start: start.value,
    end: end.value,
    page: page,
    offset
  }
}

export { calculatePaging }
