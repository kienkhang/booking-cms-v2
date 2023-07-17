<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    NBreadcrumb
      NBreadcrumbItem
        router-link.page-title.font-bold.text-2xl(to='/hotel') Yêu cầu thanh toán
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    router-link.text-sm.font-semibold(to='/hotel') Trở về
  .p-5.rounded-lg.shadow-md.bg-white.w-full.overflow-auto.space-y-6(class='h-[calc(100%-72px)]' ref='animate')
    AdminPayoutFilter
    AdminPayoutTable
</template>

<script setup lang="ts">
import AdminPayoutFilter from '@/components/adpayout/AdminPayoutFilter.vue'
import AdminPayoutTable from '@/components/adpayout/AdminPayoutTable.vue'

const { getPayoutsAdmin } = useGetPayouts()
const { executeApi: fetchPayoutsAdmin } = getPayoutsAdmin()

onMounted(() => fetchPayoutsAdmin())
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
</route>
