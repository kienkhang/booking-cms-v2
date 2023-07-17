<template lang="pug">
.flex.flex-col.w-full.gap-3
  .type-filter.flex.gap-3.w-full
    n-select.flex-shrink-0.max-w-xs(
      v-model:value='revenueType'
      :options='revenueOptions'
    )
    n-input.flex-1(
      v-model:value='search'
      placeholder='Nhập mã thanh toán vào đây'
    )
  .time-filter.flex.gap-3.w-full.items-center
    Button.p-2.rounded-md.border.text-white.bg-blue-500(type='button' @click='getToday()') Hôm nay
    Button.p-2.rounded-md.border.text-white.bg-blue-500(type='button' @click='getAWeekAgo()') Một tuần trước
    Button.p-2.rounded-md.border.text-white.bg-blue-500(type='button' @click='getAMonthAgo()') Một tháng trước
    n-date-picker(
      v-model:formatted-value='dateRange'
      value-format='yyyy-MM-dd'
      :update-value-on-close="true"
      type="daterange"
    )
    Button.p-2.rounded-md.border.text-white.bg-green-500(type='button' @click='doSearch()') Tìm kiếm

</template>

<script setup lang="ts">
import { NSelect, NInput, NDatePicker } from 'naive-ui'
import Button from '../shared/button/Button.vue'
import dayjs from 'dayjs'

const { filter } = storeToRefs(useGetPayouts())

const revenueType = ref<string | undefined>(undefined)

watch(revenueType, () => {
  filter.value.type = revenueType.value
})

// Search follow payment id
const search = ref('')

watchDebounced(
  search,
  () => {
    filter.value.payout_id = search.value
  },
  {
    debounce: 200
  }
)

// Filter follow payout status
const revenueOptions = [
  {
    label: 'Tất cả',
    value: undefined
  },
  {
    label: 'Đã yêu cầu',
    value: 'sent'
  },
  {
    label: 'Đã thanh toán',
    value: 'paid'
  }
]

// Filter by time

const dateRange = ref<[string, string]>([
  dayjs().startOf('month').format('YYYY-MM-DD'),
  dayjs().format('YYYY-MM-DD')
])

watch(dateRange, () => {
  filter.value.from = dateRange.value[0]
  filter.value.to = dateRange.value[1]
})

// handle search
const { getPayoutsPartner } = useGetPayouts()
const { executeApi: fetchPayoutsPartner } = getPayoutsPartner()
onMounted(() => fetchPayoutsPartner())

function doSearch() {
  fetchPayoutsPartner()
}

function getToday() {
  if (dateRange.value) {
    dateRange.value[0] = dayjs().subtract(1, 'day').format('YYYY-MM-DD')
    dateRange.value[1] = dayjs().format('YYYY-MM-DD')
    filter.value.from = dateRange.value[0]
    filter.value.to = dateRange.value[1]
  }
}
function getAWeekAgo() {
  if (dateRange.value) {
    dateRange.value[0] = dayjs().subtract(1, 'week').format('YYYY-MM-DD')
    dateRange.value[1] = dayjs().format('YYYY-MM-DD')
    filter.value.from = dateRange.value[0]
    filter.value.to = dateRange.value[1]
  }
}

function getAMonthAgo() {
  if (dateRange.value) {
    dateRange.value[0] = dayjs().subtract(1, 'month').format('YYYY-MM-DD')
    dateRange.value[1] = dayjs().format('YYYY-MM-DD')
    filter.value.from = dateRange.value[0]
    filter.value.to = dateRange.value[1]
  }
}
</script>

<style scoped></style>
