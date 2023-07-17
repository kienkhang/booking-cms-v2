<template lang="pug">
.flex.items-center.gap-4
  RevenueTabItem(
    v-for='tab in tabs',
    :key='tab.key'
    :tab='tab'
    :active='selectedTab === tab.key'
    @change-tab='changeTab(tab.key)'
  )

</template>

<script setup lang="ts">
import RevenueTabItem from './RevenueTabItem.vue'

const selectedTab = ref('report')

// List tabs
const tabs = [
  {
    key: 'report',
    name: 'Report'
  },
  {
    key: 'payout',
    name: 'Payout'
  }
]

function changeTab(value: string) {
  selectedTab.value = value
}
</script>

<style scoped></style>
