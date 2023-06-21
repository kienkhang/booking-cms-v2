<template lang="pug">
NPopover(:show='show' trigger='click' @clickoutside="close" style='padding:4px')
  template(#trigger)
    icon-ic:outline-more-vert.w-5.h-5.cursor-pointer(@click='open()')
  div.select-none(@click='close()')
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='text-red-600 hover:bg-red-50' @click='update()')
      icon-mdi:trash-can-outline.w-4.h-4.flex-shrink-0
      span Xóa
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='hover:bg-slate-50' @click='openUpdateModal()')
      icon-material-symbols:edit.w-4.h-4.flex-shrink-0
      span Chỉnh sửa
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='hover:bg-slate-50' @click='openWorkListModal()' v-if='updateWorkListAble')
      icon-ic:round-local-hotel.w-4.h-4.flex-shrink-0
      span Nơi làm việc
UserModal(type='edit' v-model:show="showUpdate" :user='user')
WorkModal(v-model:show="showWorkList" :user-id='user.id')
</template>

<script setup lang="ts">
import type { IUser } from '@/dtos/user'
import UserModal from './UserModal.vue'
import WorkModal from './WorkModal.vue'

const props = defineProps<{
  user: IUser
}>()
// Open close popover
const show = ref(false)
const open = () => (show.value = true)
const close = () => (show.value = false)
// open close modal
// --- update user modal ----
const showUpdate = ref(false)
const openUpdateModal = () => (showUpdate.value = true)
// --- user's work modal ----
const showWorkList = ref(false)
const openWorkListModal = () => (showWorkList.value = true)

const update = () => {
  console.log(props.user.id)
}

const updateWorkListAble = computed(
  // 5 is manager
  // 4 is staff
  () => props.user.role === '5' || props.user.role === '4'
)

const { getWorks } = useWork()

// When open modal -> getWorks for user modal
whenever(showWorkList, () => {
  getWorks(props.user.id).executeApi()
})
</script>

<style scoped></style>
