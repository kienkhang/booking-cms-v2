<template lang="pug">
Modal(:show="show" @mask-click='closeModal()')
  .absolute.right-2.top-2 
    icon-ph:x-bold.w-4.h-4.cursor-pointer(@click='closeModal()')
  div(class='w-[750px] bg-white h-[600px] rounded-10 p-8 mb-2 overflow-auto scroll-hide')
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
      n-tab-pane(name="photos" tab="Hình ảnh")
        room-file-form
</template>

<script setup lang="ts">
import Modal from './Modal.vue'
import { NTabs, NTabPane } from 'naive-ui'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()
// ======== HANDLE MODAL =============
const closeModal = () => emit('update:show', false)
// ============= =TAB STYLE ===============
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
