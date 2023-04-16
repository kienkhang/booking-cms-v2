<template lang="pug">
.flex.flex-col.justify-center.items-center.gap-3.p-3.rounded-lg.shadow-md.mx-auto(class='cursor-pointer select-none h-60 w-80 bg-zinc-50 hover:bg-opacity-50')
  slot(name='icon')
  .title.text-2xl.font-bold.cursor-pointer(@click='$emit("goto")') {{title}}
  n-popover(width='trigger')
    template(#trigger)
      .desc.text-roman-silver.text-center.mt-auto.line-clamp-2 {{description}}
    span.text-lg {{ description }}
</template>

<script setup lang="ts">
import { NPopover } from 'naive-ui'
defineProps<{
  title: string
  description: string
}>()

defineEmits<{
  (e: 'goto'): void
}>()
</script>

<style scoped></style>
