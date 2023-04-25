<template lang="pug">
.flex.justify-center.items-center.border.flex-shrink-0.select-none.cursor-pointer(class='w-16 h-8' :class="{'bg-green-200':notEmpty}")
  .font-medium {{ label }}

</template>

<script setup lang="ts">
import { type IRoomNightCell } from '@/dtos/shared'

const props = defineProps<{
  data: IRoomNightCell
}>()

const label = computed(() => props.data.quantity)

const notEmpty = computed(() => props.data.quantity !== 0)
</script>

<style scoped></style>
