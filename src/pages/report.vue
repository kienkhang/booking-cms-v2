<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    NBreadcrumb
      NBreadcrumbItem
        router-link.page-title.font-bold.text-2xl(to='/hotel') Thống kê
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    router-link.text-sm.font-semibold(to='/hotel') Trở về
  .p-5.rounded-lg.shadow-md.bg-white.w-full.overflow-auto.space-y-6(class='h-[calc(100%-72px)]' ref='animate')
    RevenueTabs
    RevenueFilter
    RevenueStatistics
    RevenueTable.mt-4
</template>

<script setup lang="ts">
import RevenueFilter from '@/components/report/RevenueFilter.vue'
import RevenueStatistics from '@/components/report/RevenueStatistics.vue'
import RevenueTable from '@/components/report/RevenueTable.vue'
import RevenueTabs from '@/components/report/RevenueTabs.vue'

const { getReports } = useReport()
const { executeApi: fetchReports } = getReports()

onMounted(() => fetchReports())
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
  requiredHotel: true
</route>
