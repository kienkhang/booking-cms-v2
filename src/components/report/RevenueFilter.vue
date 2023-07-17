<template lang="pug">
.flex.flex-col.w-full.gap-3
  .type-filter.flex.gap-3.w-full
    n-select.flex-shrink-0.max-w-xs(
      v-model:value='revenueType'
      :options='revenueOptions'
    )
    n-input.flex-1(
      v-model:value='searchDebounce'
      placeholder='Nhập mã đêm nghỉ vào đây'
    )
    Button.p-2.rounded-md.border.text-white.bg-green-500(type='button') Tìm kiếm
  .time-filter.flex.gap-3.w-full.items-center
    Button.p-2.rounded-md.border.text-white.bg-blue-500(type='button') Hôm nay
    Button.p-2.rounded-md.border.text-white.bg-blue-500(type='button') Một tuần trước
    Button.p-2.rounded-md.border.text-white.bg-blue-500(type='button') Một tháng trước
    n-date-picker(
      :default-value="[Date.now(), Date.now()]"
      :update-value-on-close="true"
      type="daterange"
    )



</template>

<script setup lang="ts">
import { NSelect, NInput, NDatePicker } from 'naive-ui'
import Button from '../shared/button/Button.vue'

const revenueType = ref<string | undefined>('all')

const search = ref('')
const searchDebounce = refDebounced(search, 100)

const revenueOptions = [
  {
    label: 'Tất cả',
    value: 'all'
  },
  {
    label: 'Đã yêu cầu',
    value: 'requested'
  },
  {
    label: 'Chưa yêu cầu',
    value: 'unpaid'
  },
  {
    label: 'Đã thanh toán',
    value: 'paid'
  }
]

const { filter } = storeToRefs(useReport())

function getToday() {}
function getAWeekAgo() {}

function getAMonthAgo() {}
</script>

<style scoped></style>
