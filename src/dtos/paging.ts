interface IResponsePaging {
  total_items: number
  total_pages: number
  page: number
  offset: number
}

interface IParamsPaging<T> {
  // Client page
  page: number
  // Client offset
  offset: number
  // Server page
  server_page: number
  // Server ofset
  server_offset: number
  // Total item in server
  total_items: number
  // data returned from server after each api call
  serverData: Ref<T[]>
}

interface ICalulatedPaging<T> {
  data: T[]
  total_pages: number
  start: number
  end: number
  page: number
  offset: number
  alpha: number
  changeServerPage: (callback: () => void) => any
}

interface IRequestFilter {
  page: number
  offset: number
  search?: string
  state?: string | {}
  [x: string]: number | string | undefined | {}
}
