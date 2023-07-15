<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    NBreadcrumb
      NBreadcrumbItem
        .page-title.font-bold.text-2xl Hotel
    Button(color='text-white' bgcolor='bg-orange-600' size='medium' @press='openModal')
      icon-mdi-voucher-outline.w-6.h-6.flex-shrink-0
      .font-bold Tạo voucher
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    span.text-sm.font-semibold Trở về
  .p-3.rounded-lg.shadow-md.bg-white.w-full.overflow-auto(class='h-[calc(100%-72px)]')
    router-view
  VoucherModal(
    v-model:show='showModal'
  )
</template>

<script setup lang="ts">
import Button from '@/components/shared/button/Button.vue'
import VoucherModal from '@/components/voucher/VoucherModal.vue'

const showModal = ref(false)

function openModal() {
  showModal.value = true
}
</script>

<route lang="yaml">
meta:
  requiredAuth: true
  requiredHotel: true
  layout: dashboard
</route>
