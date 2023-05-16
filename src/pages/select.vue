<template lang="pug">
div.h-full.w-full
  .flex.justify-center.items-center(class='h-[500px] w-full' v-if='isLoading')
    icon-custom-load.w-12.h-12.animate-spin
  .flex.flex-col.items-center.justify-center.w-full.h-full.gap-3(v-else)
    .flex.justify-center
      span.font-bold.text-base.animate-bounce {{ content }}
    .w-full.h-full.mx-auto(v-if='!isEmpty')
      .grid.grid-cols-1.gap-4.bg-white.rounded-10.scrollbar-gradient(class='flex-wrap justify-around max-w-5xl p-5 mb-3 overflow-auto md:grid-cols-3')
        HotelCard(v-for='hotel in cut()' :hotel='hotel')

      .flex.items-center.justify-between
        NPagination(
          v-model:page='pagination.page',
          :item-count='hotelCount',
          :page-size='6'
        )
    .p-6.rounded-lg.shadow-md.bg-white.overflow-auto.scrollbar-gradient(class='' ref='animate' v-else)
      HotelTabs

</template>

<script setup lang="ts">
// Components
import HotelTabs from '@/components/hotel/HotelTabs.vue'
import HotelCard from '@/components/select/HotelCard.vue'
import { useHotelsStore } from '@/stores'
import { NPagination, type PaginationInfo } from 'naive-ui'

// Get account store
// Get hotel store
const { currentHotel, hotels, paging, hotelCount } = storeToRefs(useHotelsStore())
// Get hotel function
const { getHotels } = useHotelsStore()

// Hotel empty -> show create hotel form
// else -> show hotel card
const isEmpty = computed(() => !!currentHotel.value === false && !hotels.value)
const content = computed(() => {
  if (isEmpty.value) return 'Bạn chưa có khách sạn, vui lòng liên lạc với quản trị viên'
  else return 'Chọn khách sạn để thao tác'
})

// Handle Paging hotel
const pagination = ref<Partial<PaginationInfo>>({
  page: 1,
  pageSize: 6
})
const cut = () => {
  const lastIndex = pagination.value.page * pagination.value.pageSize
  const firstIndex = lastIndex - pagination.value.pageSize
  return hotels.value.slice(firstIndex, lastIndex)
}

const isLoading = ref(false)

onBeforeMount(async () => {
  // if (paging.value) {
  //   paging.value = {
  //     page: 1,
  //     offset: 10
  //   }
  // } else getHotels()
  paging.value = null
  isLoading.value = true
  await getHotels()
  isLoading.value = false
})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
</route>
