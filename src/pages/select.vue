<template lang="pug">
.flex.flex-col.items-center.justify-center.w-full.h-full.gap-3
  span.font-bold.text-base.animate-bounce Chọn khách sạn để thao tác
  .grid.grid-cols-1.gap-4.bg-white.rounded-10.scrollbar-gradient(class='flex-wrap justify-around max-w-5xl p-5 overflow-auto md:grid-cols-3')
    HotelCard
    HotelCard
    HotelCard
    HotelCard
    HotelCard
    HotelCard


</template>

<script setup lang="ts">
import HotelCard from '@/components/select/HotelCard.vue'
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: empty
</route>
