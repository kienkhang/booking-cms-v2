<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    NBreadcrumb
      NBreadcrumbItem
        router-link.page-title.font-bold.text-2xl(to='/hotel') Khách sạn
      NBreadcrumbItem
        .page-title.font-bold.text-2xl Lịch & Giá 
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    router-link.text-sm.font-semibold(to='/hotel') Trở về
  .p-6.rounded-lg.shadow-md.bg-white.w-full.overflow-auto.space-y-6(class='h-[calc(100%-72px)]' ref='animate')
    InventorySelected
    InventoryMode
    InventoryTable
    div
      span.font-bold.text-red-600  Hướng dẫn: 
      span.font-semibold.text-blue-600.text-xs  Giữ shift và lăn chuột để cuộn ngang
</template>

<script setup lang="ts">
import InventoryMode from '@/components/inventory/InventoryMode.vue'
import InventorySelected from '@/components/inventory/InventorySelected.vue'
import InventoryTable from '@/components/inventory/InventoryTable.vue'
</script>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
</route>
