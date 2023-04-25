<template lang="pug">
div.grid.grid-cols-12.text-center
  //- Table content
  .col-span-1
    .border.border-r-0.border-b-0.h-10
    .border.border-r-0.font-semibold.py-2.text-xs Số phòng 
    .border.border-r-0.border-t-0.py-2(class='text-[10px]') Hoàn tiền
    .border.border-r-0.border-t-0.py-2(class='text-[10px]') Không hoàn tiền
  .col-span-11.overflow-auto.border.scrollbar-hide
    .flex.items-center.text-xs.font-bold
      DateCell(v-for='cell in calendar' :data='cell')
    .flex.items-center.font-bold(class='text-[10px]')
      RoomNightCell(v-for='cell in roomNightDatas' :data='cell')
    .flex.items-center.font-bold(class='text-[10px]')
      RatePackageCell(v-for='cell in ratePackageDatas' :data='cell')
    .flex.items-center.font-bold(class='text-[10px]')
      RatePackageCell(v-for='cell in ratePackageDatas' :data='cell')
      


</template>

<script setup lang="ts">
import useInventory from '@/composables/inventory/useInventory'
import {
  renderCalendar,
  renderRatePakages,
  renderRoomNights,
  ratepackages,
  roomnights
} from '@/utils/inventory'

import DateCell from './DateCell.vue'
import RoomNightCell from './RoomNightCell.vue'
import RatePackageCell from './RatePackageCell.vue'

const { month, year } = storeToRefs(useInventory())
const calendar = computed(() => renderCalendar(year.value, month.value))
const roomNightDatas = computed(() => renderRoomNights(year.value, month.value, roomnights))
const ratePackageDatas = computed(() => renderRatePakages(year.value, month.value, ratepackages))
</script>

<style scoped></style>
