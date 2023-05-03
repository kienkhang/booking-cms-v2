<template lang="pug">
.flex.flex-col.items-center.justify-center.w-full.h-full.gap-3
  span.font-bold.text-base.animate-bounce {{ content }}
  div(v-if='!isEmpty')
    .grid.grid-cols-1.gap-4.bg-white.rounded-10.scrollbar-gradient(class='flex-wrap justify-around max-w-5xl p-5 overflow-auto md:grid-cols-3')
      HotelCard
      HotelCard
      HotelCard
      HotelCard
      HotelCard
      HotelCard
  .p-6.rounded-lg.shadow-md.bg-white.overflow-auto.scrollbar-gradient(class='h-[calc(100%-72px)] w-[calc(100%-500px)]' ref='animate' v-else)
    HotelTabs

</template>

<script setup lang="ts">
import HotelTabs from '@/components/hotel/HotelTabs.vue'
import HotelCard from '@/components/select/HotelCard.vue'

// Hotel empty -> show create hotel form
// else -> show hotel card
const isEmpty = ref(true)
const content = computed(() => {
  if (isEmpty.value) return 'Bạn chưa có khách sạn, vui lòng tạo khách sạn'
  else 'Chọn khách sạn để thao tác'
})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: empty
  requiredAuth: true
</route>
