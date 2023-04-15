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
</script>

<style scoped></style>
