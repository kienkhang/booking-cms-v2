<template lang="pug">
.grid.grid-cols-3.gap-3
  RevenueStatisticsItem(v-for='revenue in revenues' :key='revenue.id' :item='revenue')

</template>

<script setup lang="ts">
import RevenueStatisticsItem from './RevenueStatisticsItem.vue'

const { summary } = storeToRefs(useReport())

const revenues = computed(() => {
  return [
    {
      id: '1',
      title: 'Doanh thu thuần',
      value: summary.value.revenue,
      bgColor: '#2FA4FF'
    },
    {
      id: '2',
      title: 'Đã thanh toán',
      value: summary.value.paid_count,
      bgColor: '#38E54D'
    },
    {
      id: '3',
      title: 'Chưa thanh toán',
      value: summary.value.unpaid_count,
      bgColor: '#FF6464'
    }
  ]
})
</script>

<style scoped></style>
