<template lang="pug">
NPopover(:show='show' trigger='click' @clickoutside="close" style='padding: 4px;')
  template(#trigger)
    icon-ic:outline-more-vert.w-5.h-5.cursor-pointer(@click='open()')
  div.select-none(@click='close()')
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='text-red-600 hover:bg-red-50' @click='deleteRoom(id)')
      icon-mdi:trash-can-outline.w-4.h-4.flex-shrink-0
      span Xóa
    .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='hover:bg-slate-50' @click='gotoEdit()')
      icon-material-symbols:edit.w-4.h-4.flex-shrink-0
      span Chỉnh sửa
    //- Room Edit Modal
</template>

<script setup lang="ts">
import { NPopover } from 'naive-ui'

const props = defineProps<{
  id: string
}>()

const router = useRouter()
const gotoEdit = () => {
  router.push({ name: `room-id-edit`, params: { id: props.id } })
}

const { openActions: open, closeActions: close, visibleActions: show, deleteRoom } = useActionRoom()
</script>

<style scoped></style>
