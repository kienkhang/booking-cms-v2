interface IClientPaging<T> {
  total_pages: number
  page: number
  offset: number
  pageShow: number
  data: T[]
}
const calculatePaging = <T>({
  sPage,
  sTotal,
  pageShow,
  offset,
  sData
}: {
  sPage: number
  sTotal: number
  pageShow: number
  offset: number
  sData: T[]
}): IClientPaging<T> => {
  const page = computed(() => {
    if (pageShow % offset === 0 || pageShow * offset <= offset) {
      return 1
    } else {
      return pageShow - sPage * offset + 1
    }
  })
  const total_pages = computed(() => Math.ceil(sTotal / (offset * page.value)))
  const start = computed(() => (page.value - 1) * offset)
  const end = computed(() => page.value * offset)
  const data = computed(() => sData.slice(start.value, end.value))

  return {
    data: data.value,
    page: page.value,
    total_pages: total_pages.value,
    offset,
    pageShow
  }
}

export { calculatePaging }
