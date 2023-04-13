<template lang="pug">
.flex.flex-col.justify-center.items-center.gap-3.p-3.rounded-lg.shadow-md.mx-auto(class='h-64 w-80')
  slot(name='icon')
  .title.text-2xl.font-bold {{title}}
  n-popover(width='trigger')
    template(#trigger)
      .desc.text-roman-silver.text-center.mt-auto.line-clamp-2 {{description}}
    span {{ description }}
</template>

<script setup lang="ts">
import { NPopover } from 'naive-ui'
defineProps<{
  title: string
  description: string
}>()
</script>

<style scoped></style>
