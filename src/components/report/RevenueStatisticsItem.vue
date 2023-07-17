<template lang="pug">
.rounded-md.w-full.h-full.p-4(:style='background')
  .flex.flex-col.gap-2
    span.text-white.text-lg.font-medium {{ item.title }}
    span.text-white.text-xl.font-bold {{ VND.format(item.value) }}

</template>

<script setup lang="ts">
import { VND } from '@/utils/format'

const props = defineProps<{
  item: {
    title: string
    value: number
    bgColor: string
  }
}>()

const background = computed(() => ({
  background: props.item.bgColor
}))
</script>

<style scoped></style>
