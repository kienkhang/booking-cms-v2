<template lang="pug">
.flex.justify-center.items-center.border.flex-shrink-0.select-none.cursor-pointer(class='w-16 h-8' :class="{'bg-orange-200':notEmpty}")
  .font-medium {{ label }}
</template>

<script setup lang="ts">
import { type IRatePackageCell } from '@/dtos/shared'

const props = defineProps<{
  data: IRatePackageCell
}>()

const label = computed(() => props.data.price)

const notEmpty = computed(() => props.data.price !== 0)
</script>

<style scoped></style>
