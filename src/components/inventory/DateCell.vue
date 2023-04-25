<template lang="pug">
.flex.justify-center.items-center.border.flex-shrink-0(class='w-16 h-10 bg-red-50')
  .font-medium {{ label }}
</template>

<script setup lang="ts">
import { type IDateCell } from '@/dtos/shared'
const props = defineProps<{
  data: IDateCell
}>()

const label = computed(() => `${props.data.dayOfWeek} ${props.data.date}`)
</script>

<style scoped></style>
