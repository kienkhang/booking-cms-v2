<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    .page-title.font-bold.text-2xl Hotel
    Button(@press="open" color='text-white' bgcolor='bg-purple-600' size='medium')
      icon-ic:round-plus.w-6.h-6.flex-shrink-0
      .font-bold Add hotel
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    router-link.text-sm.font-semibold(to='/hotel') Trở về
  .p-6.rounded-lg.shadow-md.bg-white.w-full.overflow-auto(class='h-[calc(100%-72px)]' ref='animate')
    router-view
  HotelModal(v-model:show='show')
</template>

<script setup lang="ts">
import { useAutoAnimate } from '@formkit/auto-animate/vue'
// Components
const HotelModal = defineAsyncComponent(() => import('@/components/shared/modal/HotelModal.vue'))

// Add room modal
const show = ref(false)
const open = () => (show.value = true)

// Animate screen
const [animate] = useAutoAnimate({})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
</route>
