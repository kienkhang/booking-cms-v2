<template lang="pug">
NPopover(:show='show' display-directive='show' trigger='click' @clickoutside="close" style='padding:4px')
  template(#trigger)
    icon-ic:outline-more-vert.w-5.h-5.cursor-pointer(@click='open()')
  div.select-none(@click='close()')
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='text-red-600 hover:bg-red-50' @click='deleteRatePlan()')
      icon-mdi:trash-can-outline.w-4.h-4.flex-shrink-0
      span Xóa
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='hover:bg-slate-50' @click='openEditModal()')
      icon-material-symbols:edit.w-4.h-4.flex-shrink-0
      span Chỉnh sửa
RatePlanModal(type='edit' v-model:show='showEditModal' :rate-plan='ratePlan')
</template>

<script setup lang="ts">
import { type IRatePlan } from '@/dtos'
// Components
import { NPopover } from 'naive-ui'
import RatePlanModal from '../shared/modal/RatePlanModal.vue'
import { rateplansApi } from '@/apis/rateplan'
// Define Props
const props = defineProps<{
  ratePlan: IRatePlan
}>()
// ====== POPOVER HANDLER ======
const show = ref(false)
const open = () => (show.value = true)
const close = () => (show.value = false)

// ===== RATEPLAN HANDLER
// Rate Plan Modal handler
const showEditModal = ref(false)
const openEditModal = () => (showEditModal.value = true)

const ratePlanId = computed(() => props.ratePlan.id)

const { execute } = rateplansApi.updateRatePlan(
  {
    is_delete: true
  },
  ratePlanId.value
)

const deleteRatePlan = () => {
  console.log('delete action', props.ratePlan.id)
  execute()
}
</script>

<style scoped></style>
