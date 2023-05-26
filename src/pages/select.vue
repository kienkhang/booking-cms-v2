<template lang="pug">
div.h-full.w-full
  Loading(v-if='isLoading')
  .flex.flex-col.items-center.justify-center.w-full.h-full.gap-3(v-else)
    .flex.items-center.justify-between.gap-3.w-full
      span.font-bold.text-base.animate-bounce {{ content }}
      NAutoComplete(v-model:value='search'  :input-props="{autocomplete: 'disabled'}" :options='hotelOptions' style='width: 300px;' placeholder='Nhập khách sạn cần tìm' :disabled='isLoading')
    .w-full.h-full.mx-auto(v-if='!isEmpty')
      .grid.grid-cols-1.gap-4.bg-white.rounded-10.scrollbar-gradient(class='flex-wrap justify-around p-5 mb-3 overflow-auto md:grid-cols-3')
        HotelCard(v-for='hotel in pagingData' :hotel='hotel')

      .flex.items-center.justify-between
        NPagination(
          v-model:page='pageShow',
          :page-count='cPaging?.total_pages'
          @update:page='updatePage'
        )
    .p-6.rounded-lg.shadow-md.bg-white.overflow-auto.scrollbar-gradient(class='' ref='animate' v-else)
      HotelTabs

</template>

<script setup lang="ts">
// import HotelTabs from '@/components/hotel/HotelTabs.vue'
// import HotelCard from '@/components/select/HotelCard.vue'
// import Loading from '@/components/shared/Loading.vue'
import { useHotelsStore } from '@/stores'
import { calculatePaging } from '@/utils/paging'
import { NPagination } from 'naive-ui'
// Components
const Loading = defineAsyncComponent(() => import('@/components/shared/Loading.vue'))
const HotelTabs = defineAsyncComponent(() => import('@/components/hotel/HotelTabs.vue'))
const HotelCard = defineAsyncComponent(() => import('@/components/select/HotelCard.vue'))
// Get account store
// Get hotel store
const { currentHotel, hotels, paging, filter } = storeToRefs(useHotelsStore())
// Get hotel function
const { getHotels } = useHotelsStore()
const { executeApi: fetchHotel, isLoading } = getHotels()

// Hotel empty -> show create hotel form
// else -> show hotel card
const isEmpty = computed(() => !!currentHotel.value === false && !hotels.value)
const content = computed(() => {
  if (isEmpty.value) return 'Bạn chưa có khách sạn, vui lòng liên lạc với quản trị viên'
  else return 'Chọn khách sạn để thao tác'
})

// NaiveUI Pagination component
const pageShow = ref(1)

const cPaging = computed(() =>
  calculatePaging({
    offset: 6,
    pageShow: pageShow.value,
    sPage: paging.value.page,
    sTotal: paging.value.total_items,
    sData: hotels.value
  })
)

const pagingData = computed(() => cPaging.value.data)

// ---- HANDLE SEARCH HOTEL ----

// Search text input
const search = ref('')
// hotel options each input change
const hotelOptions = computed(() => {
  // return selected with name
  return hotels.value.map((hotel) => ({
    label: hotel.name,
    value: hotel.name
  }))
})

watchDebounced(
  search,
  async () => {
    filter.value = {
      search: search.value,
      offset: 9,
      page: 1
    }
    await fetchHotel()
  },
  { debounce: 1000 }
)

// ---- HANDLE PAGING HOTEL ----

const updatePage = async (page: number) => {
  if (page * 6 <= paging.value.page * paging.value.offset) {
    return
  } else {
    filter.value = {
      search: search.value,
      page: paging.value.page + 1,
      offset: 9
    }
    await fetchHotel()
  }
}

onMounted(async () => {
  // Reset current hotel
  currentHotel.value = null
  // reset paging and call api hotels
  filter.value = {
    offset: 9,
    page: 1
  }
  await fetchHotel()
})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
</route>
