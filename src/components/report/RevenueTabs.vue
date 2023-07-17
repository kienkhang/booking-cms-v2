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

const { selectedTab } = storeToRefs(useReportTab())
const { changeTab, tabs } = useReportTab()
</script>

<style scoped></style>
