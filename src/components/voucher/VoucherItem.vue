<template lang="pug">
.bg-white.rounded-lg.w-64.border.overflow-hidden
  .flex.flex-col
    .flex.items-center.gap-4.px-4.py-3.shadow-md.bg-crayola.text-white
      icon-mdi-voucher-outline.w-6.h-6.flex-shrink-0
      span.text-lg.font-bold.line-clamp-2 Chiến dịch du lịch khắp nơi mùa hè
    .px-4.py-3
      .flex.items-center.justify-between
        span.font-bold Code
        span XXXXXXX
      .flex.items-center.justify-between
        span.font-bold Expire
        span {{ format }}
      

</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const begin = useNow()
const end = useNow()
const format = `${dayjs(begin.value).format('YYYY-MM-DD')} - ${dayjs(end.value).format(
  'YYYY-MM-DD'
)}`
</script>

<style scoped></style>
