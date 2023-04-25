<template lang="pug">
.flex.items-center.justify-between
  NSelect(v-model:value="roomSelected"
          title="CHon5 phong"
          filterable
          placeholder="Please select a song"
          :options="roomOptions"
          style='width: max-content;'
          @update:value='updateRoom()'
          )
  NDatePicker(v-model:value="timestamp" type="month" clearable @update:value='updateTime()')
</template>

<script setup lang="ts">
import useInventory from '@/composables/inventory/useInventory'
import dayjs from 'dayjs'
import { NDatePicker, NSelect } from 'naive-ui'
const { setMonth, setYear, setRoom } = useInventory()

// ----------- SELECT ROOM ---------------
const roomOptions = [
  {
    label: 'Room Type 1',
    value: 'roomtypeid1'
  },
  {
    label: 'Room Type 2',
    value: 'roomtypeid2'
  },
  {
    label: 'Room Type 3',
    value: 'roomtypeid3'
  }
]
const roomSelected = ref<string | null>(roomOptions[0].value)
const updateRoom = () => {
  setRoom(roomSelected.value)
}
// ----------- SELECT MONTH & YEAR ---------------
const timestamp = ref<number>(new Date().getTime())
const selectedMonth = computed(() => dayjs(timestamp.value).month())
const selectedYear = computed(() => dayjs(timestamp.value).year())

const updateTime = () => {
  setMonth(selectedMonth.value)
  setYear(selectedYear.value)
}
</script>
