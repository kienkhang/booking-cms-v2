<template lang="pug">
DashboardHeader
.flex.items-center(class='h-[calc(100%-100px)]')
  .flex-shrink-0.h-full.w-full(class='max-w-[250px] hidden md:block')
    DashboardSidebar
  .p-3.m-3.h-full.w-full
      router-view
</template>

<script setup lang="ts">
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'

// Guard if no hotel selected
// const { hotelId } = useHotelStorage()

// const router = useRouter()

// onBeforeMount(() => {
//   // Check exist hotel -> exist -> go to app
//   if (!!hotelId.value === false) {
//     router.push({ name: 'select' })
//   }
// })
</script>

<style scoped></style>
