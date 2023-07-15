<template lang="pug">
.flex.flex-col(class='lg:justify-center lg:flex-row')
  .flex.flex-col.gap-2.select-none.mb-4(class='lg:mr-16 lg:mb-0')
    span.font-bold Phòng
    NSelect(v-model:value="roomSelected"
            label='Phòng'
            filterable
            placeholder="Please select a room"
            :options="roomOptions"
            style='width: max-content;'
            @update:value='updateRoom()'
            )
  .flex.flex-col.gap-2.select-none
    span.font-bold Thời gian
    NDatePicker(
      v-model:value="timestamp"
      type="month" 
      clearable 
      style='width: max-content;'
      @update:value='updateTime()'
      )
</template>

<script setup lang="ts">
import useInventory from '@/composables/inventory/useInventory'
import dayjs from 'dayjs'
// Components
import { NDatePicker, NSelect } from 'naive-ui'

// Hooks from naiveui
// const mess = useMessage()

// Set time with use inventory
const { setMonth, setYear, setRoom } = useInventory()
const { rooms } = useRoom()
// ----------- SELECT ROOM ---------------
const roomOptions = computed(() => {
  return rooms.value.map((room) => {
    return {
      label: room.name,
      value: room.id
    }
  })
})
// Biding room selected ref
const roomSelected = ref<string | null>(null)
// Update room selected
const updateRoom = () => {
  setRoom(roomSelected.value)
}

// Destructuring fetch inventory function
const { getInventories } = useInventoryStore()
const { getRatePlans } = useRatePlan()
const { query, roomId } = useMutateInventory()
// Each month, year, room change -> fetch api get inventories
watch([query, roomId], async () => {
  console.log('Thay đổi [month,year,room]')
  await getInventories(query, roomId).executeApi()
  await getRatePlans(roomId).executeApi()
})
// Every time the room is updated, call
// // When ever room options have value -> set default roomSelected
// whenever(roomOptions, () => {
//   // set default selected
//   roomSelected.value = roomOptions.value[0].value
//   // set room in inventory
//   updateRoom()
// })
// ----------- SELECT MONTH & YEAR ---------------
const timestamp = ref<number>(new Date().getTime())
const selectedMonth = computed(() => dayjs(timestamp.value).month())
const selectedYear = computed(() => dayjs(timestamp.value).year())

const updateTime = () => {
  setMonth(selectedMonth.value)
  setYear(selectedYear.value)
}
</script>
