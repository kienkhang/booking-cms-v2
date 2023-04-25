<template lang="pug">
div.h-full.w-full
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    router-link.text-sm.font-semibold(to='/hotel') Trở về
  .p-6.rounded-lg.shadow-md.bg-white.w-full.overflow-auto(class='h-[calc(100%-72px)]' ref='animate')
    InventorySelected
    .mt-6
    InventoryTable
</template>

<script setup lang="ts">
import InventorySelected from '@/components/inventory/InventorySelected.vue'
import InventoryTable from '@/components/inventory/InventoryTable.vue'
</script>

<route lang="yaml">
meta:
  layout: dashboard
</route>
