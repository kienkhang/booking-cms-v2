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
  total_items,
  server_page,
  server_offset
}: {
  page: number
  offset: number
  total_items: number
  server_page: number
  server_offset: number
  sData: Ref<T[]>
}): IClientPaging<T> => {
  const end = computed(() => {
    return offset * page - (server_page - 1) * server_offset
  })
  const start = computed(() => end.value - offset)
  const total_pages = computed(() => Math.ceil(total_items / offset))
  const data = computed(() => sData.value.slice(start.value, end.value))

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
