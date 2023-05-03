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
  n-tab-pane(name="infos" tab="Thông tin phòng")
    //- room-info
    span Khi nào có room thì sẽ show ra
  n-tab-pane(name="edit" tab="Chỉnh sửa" display-directive="show:lazy")
    room-form 
  n-tab-pane(name="rateplans" tab="Gói giá")
    rateplan-list
</template>

<script setup lang="ts">
import RateplanList from '@/components/room/RateplanList.vue'
import RoomForm from '@/components/room/RoomForm.vue'
import RoomInfo from '@/components/room/RoomInfo.vue'
import { NTabs, NTabPane } from 'naive-ui'

// Hooks
const route = useRoute()
const router = useRouter()

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

// ============== GET ROOM BY ID ===============
const roomId = computed(() => route.params?.id)
// Call api get room
console.log('🐔🦢 ~ roomId:', roomId)
</script>

<style scoped></style>
