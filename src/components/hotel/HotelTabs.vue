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
  n-tab-pane(name="infos" tab="Thông tin" display-directive="show:lazy")
    hotel-info
  n-tab-pane(name="update" tab="Chỉnh sửa" display-directive="show:lazy")
    hotel-info-form
  n-tab-pane(name="photos" tab="Hình ảnh" :disabled='isCreateHotel')
    hotel-file-form
</template>

<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui'
import { type CSSProperties } from 'vue'
// Components
const HotelInfo = defineAsyncComponent(() => import('@/components/hotel/HotelInfo.vue'))
const HotelInfoForm = defineAsyncComponent(() => import('@/components/hotel/HotelInfoForm.vue'))
const HotelFileForm = defineAsyncComponent(() => import('@/components/hotel/HotelFileForm.vue'))

// ------ HANDLER ---------
const route = useRoute()

const isCreateHotel = computed(() => route.name === 'select')

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
