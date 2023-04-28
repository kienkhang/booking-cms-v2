<template lang="pug">
.flex.justify-center.items-center.border.flex-shrink-0.select-none.cursor-pointer(class='w-20 h-8' :class="[{'bg-blue-500 text-white':selected}, {'bg-orange-500 text-white':notEmpty && !selected}]"  :style='style' @click='doSelect')
  .font-medium {{ label }}
</template>

<script setup lang="ts">
import { type IRatePackageCell } from '@/dtos/shared'
import { VND } from '@/utils/format'
import dayjs from 'dayjs'

const props = defineProps<{
  data: IRatePackageCell
  rateplan: string
}>()

// push message
const message = useMessage()

// useInventory
const { selectedRatePackage, adjustRate, mode, rateplan } = storeToRefs(useInventory())
const { exist, selectRate, removeSelected } = useInventory()

const doSelect = () => {
  if (mode.value === 'dayOfWeek') {
    message.error('Bạn không ở chế độ chọn tự do')
    return
  }
  if (!exist(props.data.availability_at, selectedRatePackage.value)) {
    selectRate({ date: props.data.availability_at, ratePlan: props.rateplan })
    return
  }
  removeSelected(props.data.availability_at, selectedRatePackage)
}

// is selected cell
const selected = computed(
  () =>
    exist(props.data.availability_at, selectedRatePackage.value) &&
    rateplan.value === props.rateplan
)
// Label of content
const label = computed(() => VND.format(props.data.price))
// Check cell no value
const notEmpty = computed(() => props.data.price !== 0)
// Khóa khi ngày hiện tại lớn hơn ngày trong data
const isDisabled = computed(
  () => dayjs().unix() >= dayjs(props.data.availability_at).unix() || !adjustRate.value
)
const style = computed(
  () => `${isDisabled.value ? 'background-color: #ccc; color: black; cursor: not-allowed;' : ''}`
)
</script>

<style scoped></style>
