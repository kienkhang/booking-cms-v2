<template lang="pug">
.flex.justify-center.items-center.border.flex-shrink-0.select-none.cursor-pointer(class='w-20 h-8' :class="[{'bg-orange-500 text-white':notEmpty},{'bg-blue-500 text-white':selected}]"  :style='style' @click='doSelect')
  .font-medium {{ label }}
</template>

<script setup lang="ts">
import { type IRatePackageCell } from '@/dtos/shared'
import { VND } from '@/utils/format'
import dayjs from 'dayjs'

const props = defineProps<{
  data: IRatePackageCell
}>()

// useInventory
const { selectedRatePackage } = storeToRefs(useInventory())
const { exist, selectRatePackage } = useInventory()

const doSelect = () => {
  selectRatePackage({ date: props.data.availability_at, ratePlan: 'A' })
}

// is selected cell
const selected = computed(() => exist(props.data.availability_at, selectedRatePackage.value))
// Label of content
const label = computed(() => VND.format(props.data.price))
// Check cell no value
const notEmpty = computed(() => props.data.price !== 0)
// Khóa khi ngày hiện tại lớn hơn ngày trong data
const isDisabled = computed(() => dayjs().unix() >= dayjs(props.data.availability_at).unix())
const style = computed(
  () => `${isDisabled.value ? 'background-color: #ccc; color: black; cursor: not-allowed;' : ''}`
)
</script>

<style scoped></style>
