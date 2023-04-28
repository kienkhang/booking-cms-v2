<template lang="pug">
.flex.items-center.justify-between
  .flex.flex-col.gap-2.select-mode.rounded-10.p-3.bg-cultured(ref='rootAnimate')
    .flex.items-center.gap-2
      NRadioGroup(v-model:value='mode' name='mode-group')
        NRadio(key='free-mode' value='free' label='Chọn tự do')
        NRadio(key='dayofweek-mode' value='dayOfWeek' label='Chọn theo thứ')
    .grid.grid-cols-4.gap-2.day-of-week.rounded-10.p-3.bg-cultured(v-if='mode==="dayOfWeek"')
      NCheckbox(v-model:checked='d[1].check' :key='d[1].dow') Thứ 2
      NCheckbox(v-model:checked='d[2].check' :key='d[2].dow') Thứ 3
      NCheckbox(v-model:checked='d[3].check' :key='d[3].dow') Thứ 4
      NCheckbox(v-model:checked='d[4].check' :key='d[4].dow') Thứ 5
      NCheckbox(v-model:checked='d[5].check' :key='d[5].dow') Thứ 6
      NCheckbox(v-model:checked='d[6].check' :key='d[6].dow') Thứ 7
      NCheckbox(v-model:checked='d[0].check' :key='d[0].dow') Chủ nhật
    .flex.flex-col.gap-2(v-if='mode==="dayOfWeek"')
      label.font-semibold.select-none Chọn rate plan
      NSelect(v-model:value="rateplan"
            title="Chọn rate plan"
            filterable
            placeholder="Please select a rate plan"
            :options="rateplanOptions"
            style='width: max-content;'
            )
  .flex.flex-col.gap-2.select-mode.rounded-10.p-3.bg-cultured
    .flex.items-center.gap-2
      NRadioGroup(v-model:value='adjustRate' name='mode-group')
        NRadio(key='rate' :value='true' label='Giá')
        NRadio(key='roomnight' :value='false' label='Số phòng')
    FormKit(type='form' :actions='false' @submit='doSubmit' name='update-inventory')
      FormKit(type='number' name='price' label='Giá tiền' step=500 validation='required|number|min:0' :value='100000' v-if='adjustRate')
      FormKit(type='number' name='quanity' label='Số phòng' step=1 validation='required|number|min:0' :value='1' v-else)
      FormKit(type='submit') Cập nhật
      

</template>

<script setup lang="ts">
import { selectMultipleDate } from '@/utils/inventory'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import dayjs from 'dayjs'
import remove from 'lodash-es/remove'
// Component
import { NCheckbox, NRadio, NRadioGroup, NSelect } from 'naive-ui'

// ------------- DAY OF WEEK SELECT MODE & SELECT TABLE --------------
// Radio select -> Free or DayOfWeek "mode"
const { mode, month, rateplan, year, adjustRate, room, selectedRatePackage, selectedRoomNight } =
  storeToRefs(useInventory())
const { selectRate, selectRoomNight } = useInventory()

// selected rateplan
// rateplan options
const rateplanOptions = [
  {
    label: 'Hoàn tiền',
    value: 'rateplan1'
  },
  {
    label: 'Không hoàn tiền',
    value: 'rateplan2'
  }
]

// Value day of week
// dow: day of week
const d = reactive([
  {
    dow: 0,
    check: false
  },
  {
    dow: 1,
    check: false
  },
  {
    dow: 2,
    check: false
  },
  {
    dow: 3,
    check: false
  },
  {
    dow: 4,
    check: false
  },
  {
    dow: 5,
    check: false
  },
  {
    dow: 6,
    check: false
  }
])
// day of week remove
const unselectedDates = computed(() => {
  const check = d.map((item) => {
    if (!item.check) {
      return { ...item, dates: selectMultipleDate(item.dow, month.value, year.value) }
    }
  })
  let arr: string[] = []
  check.forEach((c) => {
    if (c !== undefined) {
      arr = [...arr, ...c.dates]
    }
  })
  const filterDates = arr.filter((date) => dayjs().unix() <= dayjs(date).unix())
  return filterDates
})
// All day choosen
const selectedDates = computed(() => {
  const check = d.map((item) => {
    if (item.check) {
      return { ...item, dates: selectMultipleDate(item.dow, month.value, year.value) }
    }
  })
  let arr: string[] = []
  check.forEach((c) => {
    if (c !== undefined) {
      arr = [...arr, ...c.dates]
    }
  })
  const filterDates = arr.filter((date) => dayjs().unix() <= dayjs(date).unix())
  return filterDates
})
// watch([unselectedDates], () => {})

watch([unselectedDates], () => {
  if (adjustRate.value) {
    unselectedDates.value.forEach((date) => {
      remove(selectedRatePackage.value, (rp) => rp.date === date)
    })
  } else {
    unselectedDates.value.forEach((date, index) => {
      remove(selectedRoomNight.value, (rn) => {
        return rn.date === date
      })
    })
  }
})

watch([selectedDates], () => {
  if (adjustRate.value) {
    selectedDates.value.forEach((date) => {
      selectRate({ date, ratePlan: rateplan.value })
    })
  } else {
    selectedDates.value.forEach((date) => {
      selectRoomNight({ date, roomType: room.value })
    })
  }
})

// ------------- UPDATE TABLE --------------
const doSubmit = (data: any) => {
  console.log(data)
}

// make animation for mode
const [rootAnimate] = useAutoAnimate()
</script>

<style scoped></style>
