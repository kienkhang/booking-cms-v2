<template lang="pug">
div.select-none
  .grid.grid-cols-12.text-center(v-if='showInventories')
    //- Table content
    .col-span-2
      .border.border-r-0.border-b-0.h-10
      .border.border-r-0.font-semibold.py-2.text-xs.bg-pink-200 Số phòng 
      .border.border-r-0.font-medium.border-t-0.py-2(class='text-xs line-clamp-1 overflow-ellipsis' v-for='ratePlan in ratePlanLists')
        span {{ratePlan.name}}
    .col-span-10.overflow-auto.border.scrollbar-gradient.scroll-smooth(@wheel="wheel" ref='scrollContainer')
      //- Render days
      .flex.items-center.text-xs.font-bold
        DateCell(v-for='cell in calendar' :data='cell')
      //- Render room nights
      .flex.items-center.font-bold(class='text-xs')
        RoomNightCell(v-for='cell in roomNights' :data='cell')
      //- Render rate packages
      .flex.items-center.font-bold(class='text-xs' v-for='ratePlan in ratePlans' :key='ratePlan.ratePlanId')
        RatePackageCell(v-for='cell in ratePlan.ratePackages' :data='cell' :ratePlan='ratePlan.ratePlanId')
  .mt-4(v-if='showInventories')
    span.font-bold.text-red-600  Hướng dẫn: 
    span.font-semibold.text-blue-600.text-xs  Lăn chuột để cuộn ngang
  NEmpty(description='Cần chọn phòng có gói giá để bắt đầu thiết lập' size='huge' v-else)

</template>

<script setup lang="ts">
import useInventory from '@/composables/inventory/useInventory'
// Inventory utils
import {
  renderCalendar,
  renderRatePakages,
  renderRoomNights
  // ratepackages
  // roomnights
} from '@/utils/inventory'
// Components
import DateCell from './DateCell.vue'
import RoomNightCell from './RoomNightCell.vue'
import RatePackageCell from './RatePackageCell.vue'
import useMutateInventory from '@/composables/inventory/useMutateInventory'
import dayjs from 'dayjs'
import { NEmpty } from 'naive-ui'

// Hooks from naive ui
const mess = useMessage()

// ========= HORIZONTAL SCROLL HANDLER ===============

// define scroll container
const scrollContainer = ref<HTMLElement>(null)
// scroll horizontal event
const wheel = (e: WheelEvent) => {
  // the bigger deltaY is, the faster scroll is
  scrollContainer.value.scrollLeft += e.deltaY * 2
}

// ========= INVENTORY HANDLER ===============

// Get ratePlans list
const { ratePlans: ratePlanLists } = useRatePlan()

// Get inventory from store
const { inventories } = useMutateInventory()

const showInventories = computed(() => {
  if (inventories.value && inventories.value.rateplans) {
    return true
  }
  return false
})

// date from database non formatted -> '2019-01-25T02:00:00.000Z' (ISO 8601 string)
// we can formated date with YYYY-MM-DD type
const formatedInventories = computed(() => {
  if (inventories.value) {
    return {
      // return room night & format availibility_at
      roomnight: inventories.value.roomnight?.map((inv) => ({
        ...inv,
        availability_at: dayjs(inv.availability_at).format('YYYY-MM-DD')
      })),
      // return rateplans
      rateplans: inventories.value.rateplans?.map((rp) => {
        return {
          // return rateplan_id
          rateplan_id: rp.rateplan_id,
          // format availibility_at in prices
          prices: rp.prices?.map((price) => ({
            ...price,
            availability_at: dayjs(price.availability_at).format('YYYY-MM-DD')
          }))
        }
      })
    }
  }
})

// Get Month and Year from store
const { month, year } = storeToRefs(useInventory())
// render calendar follow year and month
const calendar = computed(() => renderCalendar(year.value, month.value))

// render room nights follow year and month
const roomNights = computed(() =>
  renderRoomNights(year.value, month.value, formatedInventories.value?.roomnight)
)

// render rate plans follow year and month
const ratePlans = computed(() => {
  return formatedInventories.value?.rateplans?.map((r) => {
    return {
      // render rate package follow rate plan
      // render ratepland id
      ratePlanId: r.rateplan_id,
      // rate package follow date
      ratePackages: renderRatePakages(year.value, month.value, r.prices)
    }
  })
})

watch(inventories, () => {
  if (!inventories.value?.rateplans) {
    mess.error('Phòng chưa có gói giá, vui lòng vào Phòng > Chi tiết phòng > Gói giá để tạo', {
      duration: 5000
    })
  }
})
</script>

<style scoped></style>
