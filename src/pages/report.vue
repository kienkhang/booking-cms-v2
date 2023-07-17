<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    NBreadcrumb
      NBreadcrumbItem
        router-link.page-title.font-bold.text-2xl(to='/hotel') Thống kê
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    router-link.text-sm.font-semibold(to='/hotel') Trở về
  .p-5.rounded-lg.shadow-md.bg-white.w-full.overflow-auto.space-y-6(class='h-[calc(100%-72px)]' v-auto-animate)
    RevenueTabs
    div.report(v-if='tab==="report"')
      RevenueFilter.mt-4
      RevenueStatistics.mt-4
      RevenueTable.mt-4
    div.payout(v-else-if='tab==="payout"')
      PayoutFilter
      PayoutTable
</template>

<script setup lang="ts">
const PayoutFilter = defineAsyncComponent(() => import('@/components/report/PayoutFilter.vue'))
const PayoutTable = defineAsyncComponent(() => import('@/components/report/PayoutTable.vue'))
const RevenueFilter = defineAsyncComponent(() => import('@/components/report/RevenueFilter.vue'))
const RevenueStatistics = defineAsyncComponent(
  () => import('@/components/report/RevenueStatistics.vue')
)
const RevenueTable = defineAsyncComponent(() => import('@/components/report/RevenueTable.vue'))
const RevenueTabs = defineAsyncComponent(() => import('@/components/report/RevenueTabs.vue'))

const { selectedTab: tab } = storeToRefs(useReportTab())

// // Mounted and fetch api report
// const { getReports } = useReport()
// const { executeApi: fetchReports } = getReports()

// onMounted(() => fetchReports())
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
  requiredHotel: true
</route>
