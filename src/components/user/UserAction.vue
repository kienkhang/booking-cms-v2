<template lang="pug">
NPopover(:show='show' trigger='click' @clickoutside="close")
  template(#trigger)
    icon-ic:outline-more-vert.w-5.h-5.cursor-pointer(@click='open()')
  div.select-none
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='text-red-600 hover:bg-red-50' @click='close()')
      icon-mdi:trash-can-outline.w-4.h-4.flex-shrink-0
      span Xóa
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='hover:bg-slate-50' @click='close()')
      icon-material-symbols:edit.w-4.h-4.flex-shrink-0
      span Chỉnh sửa
UserModal(type='edit' :show="showModal")
</template>

<script setup lang="ts">
import type { User } from '@/dtos/user'
import UserModal from './UserModal.vue'
// Open close popover
const show = ref(false)
const open = () => (show.value = true)
const close = () => (show.value = false)
// open close modal
const showModal = ref(false)
const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)
</script>

<style scoped></style>
