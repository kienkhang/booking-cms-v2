<template lang="pug">
.flex.flex-col.items-center.justify-center.w-full.h-full.gap-3
  span.font-bold.text-base.animate-bounce {{ content }}
  div(v-if='!isEmpty')
    .grid.grid-cols-1.gap-4.bg-white.rounded-10.scrollbar-gradient(class='flex-wrap justify-around max-w-5xl p-5 overflow-auto md:grid-cols-3')
      HotelCard(v-for='hotel in hotels' :hotel='hotel')
  .p-6.rounded-lg.shadow-md.bg-white.overflow-auto.scrollbar-gradient(class='h-[calc(100%-72px)] w-[calc(100%-500px)]' ref='animate' v-else)
    HotelTabs(v-if='isHotelier')

</template>

<script setup lang="ts">
// Components
import HotelTabs from '@/components/hotel/HotelTabs.vue'
import HotelCard from '@/components/select/HotelCard.vue'
import { useHotelsStore } from '@/stores'

// Get account store
const { isHotelier } = storeToRefs(useAccountsStore())
// Get hotel store
const { currentHotel, hotels } = storeToRefs(useHotelsStore())
const { getHotelLocalStore } = useHotelsStore()

// Hotel empty -> show create hotel form
// else -> show hotel card
const isEmpty = computed(() => !!currentHotel.value === false)
const content = computed(() => {
  if (isEmpty.value) return 'Bạn chưa có khách sạn, vui lòng liên lạc với quản trị viên'
  else 'Chọn khách sạn để thao tác'
})

onBeforeMount(async () => {
  await getHotelLocalStore()
})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: empty
  requiredAuth: true
</route>
