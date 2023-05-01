<template lang="pug">
.flex.justify-center.items-center.border.flex-shrink-0.select-none.cursor-pointer(class='w-20 h-8' :class="[{'bg-green-500 text-white':notEmpty && !selected},{'bg-blue-500 text-white':selected}]" :style='style' @click='doSelect')
  .font-medium {{ label }}

</template>

<script setup lang="ts">
import { type IRoomNightCell } from '@/dtos/shared'
import dayjs from 'dayjs'

const props = defineProps<{
  data: IRoomNightCell
}>()

// push message
const message = useMessage()

// useInventory
const { room, adjustRate, mode } = storeToRefs(useInventory())
const { existRoomNight, selectRoomNight, removeRoom } = useInventory()

const doSelect = () => {
  if (mode.value === 'dayOfWeek') {
    message.error('Bạn không ở chế độ chọn tự do')
    return
  }

  if (!existRoomNight(props.data.availability_at, room.value)) {
    selectRoomNight({ date: props.data.availability_at, roomType: room.value })
    return
  }
  removeRoom({ date: props.data.availability_at, roomType: room.value })
}

// RENDER CONDITIONAL
// is selected cell
const selected = computed(() => existRoomNight(props.data.availability_at, room.value))
// Label of cell
const label = computed(() => props.data.quantity)
// check no data
const notEmpty = computed(() => props.data.quantity !== 0)
// Khóa khi ngày hiện tại lớn hơn ngày trong data
const isDisabled = computed(
  () => dayjs().unix() >= dayjs(props.data.availability_at).unix() || adjustRate.value
)
// Cell style
const style = computed(
  () => `${isDisabled.value ? 'background-color: #ccc; color: black; cursor: not-allowed;' : ''}`
)
</script>

<style scoped></style>
