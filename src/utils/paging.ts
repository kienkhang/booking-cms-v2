interface IClientPaging<T> {
  data: T[]
  total_pages: number
  start: number
  end: number
  page: number
  offset: number
  alpha: number
  changeServerPage: (callback: () => void) => any
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
  // Paging and return data follow client page
  const end = computed(() => {
    return offset * page - (server_page - 1) * server_offset
  })
  const start = computed(() => end.value - offset)
  const total_pages = computed(() => Math.ceil(total_items / offset))
  const data = computed(() => sData.value.slice(start.value, end.value))
  // Handle call api each server_page change
  const alpha = computed(() => Math.ceil(page / (server_offset / offset)))

  function changeServerPage(callback: () => any) {
    // Increment page filter
    if (page * offset > server_page * server_offset) {
      // callback to change page
      // handle set server_page == alpha and call api
      callback()
    }
    // Decrement page filter
    else if ((server_page - 1) * server_offset >= page * offset) {
      // handle set server_page == alpha and call api
      callback()
    }
  }

  return {
    data: data.value,
    total_pages: total_pages.value,
    start: start.value,
    end: end.value,
    page: page,
    offset,
    alpha: alpha.value,
    changeServerPage
  }
}

export { calculatePaging }
