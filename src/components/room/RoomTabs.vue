<template lang="pug">
n-tabs.config-tab(
      type="line"
      size='large'
      default-value='basic'
      :bar-width="500"
      justify-content='space-evenly'
      :tab-style='tabStyle'
      class="mx-auto"
      animated
    )
      //- tab label của Tab, name là value của Tab
      n-tab-pane(name="basic" tab="Thông tin" display-directive="show:lazy")
        room-form
      n-tab-pane(name="photos" tab="Hình ảnh" :disabled='addRoomAble')
        room-file-form

</template>

<script setup lang="ts">
import RoomForm from './RoomForm.vue'
import RoomFileForm from './RoomFileForm.vue'
import { NTabPane, NTabs } from 'naive-ui'
// ============= =TAB STYLE ===============
import { type CSSProperties } from 'vue'
const route = useRoute()
const addRoomAble = computed(() => route.name === 'room')

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
