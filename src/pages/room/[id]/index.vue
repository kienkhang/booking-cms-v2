<template lang="pug">
n-tabs.config-tab(
  type="line"
  size='large'
  default-value='infos'
  :bar-width="500"
  justify-content='space-evenly'
  :tab-style='tabStyle'
  class="mx-auto"
  animated
)
  //- tab label của Tab, name là value của Tab
  n-tab-pane(name="infos" tab="Thông tin phòng" display-directive='show:lazy')
    room-info
  n-tab-pane(name="rateplans" tab="Gói giá" display-directive='show:lazy')
    rate-plan-table
</template>

<script setup lang="ts">
import RatePlanTable from '@/components/rateplan/RatePlanTable.vue'
// import RoomForm from '@/components/room/RoomForm.vue'
import RoomInfo from '@/components/room/RoomInfo.vue'
import { NTabs, NTabPane } from 'naive-ui'

// Hooks

// ============= =TAB STYLE ===============
import { type CSSProperties } from 'vue'

const tabStyle = computed<CSSProperties>(() => ({
  width: '200px',
  minWidth: '100px',
  minHeight: '50px',
  textAlign: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: 600,
  textColor: '#616161'
}))
</script>

<style scoped></style>
