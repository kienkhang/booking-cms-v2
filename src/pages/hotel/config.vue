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
  n-tab-pane(name="basic" tab="Basic" display-directive="show:lazy")
    hotel-config-form
  n-tab-pane(name="photos" tab="Photos")
    hotel-upload-form
</template>

<script setup lang="ts">
import HotelConfigForm from '@/components/hotel/HotelConfigForm.vue'
import HotelUploadForm from '@/components/hotel/HotelUploadForm.vue'
import { NTabs, NTabPane } from 'naive-ui'
import { type CSSProperties } from 'vue'

// const update = (name: string) => {
//   tabValue.value = name

// }

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

<!-- <route lang="yaml">
meta:
  layout: dashboard
</route> -->
