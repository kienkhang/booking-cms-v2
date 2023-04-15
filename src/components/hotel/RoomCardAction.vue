<template lang="pug">
NPopover(:show='show' trigger='click' @clickoutside="close")
  template(#trigger)
    icon-ic:outline-more-vert.w-5.h-5.cursor-pointer(@click='open()')
  div.select-none
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='text-red-600 hover:bg-red-50' @click='close()')
      icon-mdi:trash-can-outline.w-4.h-4.flex-shrink-0
      span Xóa
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='hover:bg-slate-50' @click='close()')
      icon-material-symbols:lock-outline.w-4.h-4.flex-shrink-0
      span Khóa
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='hover:bg-slate-50' @click='close()')
      icon-material-symbols:lock-open-outline.w-4.h-4.flex-shrink-0
      span Mở khóa

</template>

<script setup lang="ts">
import { NPopover } from 'naive-ui'
const { openActions: open, closeActions: close, visibleActions: show } = useActionRoom()
</script>

<style scoped></style>
