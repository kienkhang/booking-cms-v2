<template lang="pug">
DashboardHeader
.flex.items-center(class='h-[calc(100%-100px)]')
  .flex-shrink-0.h-full.w-full(class='max-w-[250px]')
    DashboardSidebar
  .p-3.h-full.w-full
    .p-3.rounded-md.shadow-md.bg-white.h-full.w-full.overflow-auto
      router-view
</template>

<script setup lang="ts">
import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
</script>

<style scoped></style>
