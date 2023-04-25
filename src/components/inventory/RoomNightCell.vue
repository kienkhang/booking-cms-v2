<template lang="pug">
.flex.justify-center.items-center.border.flex-shrink-0.select-none.cursor-pointer(class='w-20 h-8' :class="[{'bg-green-500 text-white':notEmpty},{'bg-blue-500 text-white':selected}]" :style='style' @click='doSelect')
  .font-medium {{ label }}

</template>

<script setup lang="ts">
import { type IRoomNightCell } from '@/dtos/shared'
import dayjs from 'dayjs'

const props = defineProps<{
  data: IRoomNightCell
}>()

// useInventory
const { selectedRoomNight, room } = storeToRefs(useInventory())
const { exist, selectRoomNight } = useInventory()

const doSelect = () => {
  selectRoomNight({ date: props.data.availability_at, roomType: room.value })
}

// RENDER CONDITIONAL
// is selected cell
const selected = computed(() => exist(props.data.availability_at, selectedRoomNight.value))
// Label of cell
const label = computed(() => props.data.quantity)
// check no data
const notEmpty = computed(() => props.data.quantity !== 0)
// Khóa khi ngày hiện tại lớn hơn ngày trong data
const isDisabled = computed(() => dayjs().unix() >= dayjs(props.data.availability_at).unix())
// Cell style
const style = computed(
  () => `${isDisabled.value ? 'background-color: #ccc; color: black; cursor: not-allowed;' : ''}`
)
</script>

<style scoped></style>
