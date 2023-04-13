<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.mb-3.h-12
    .page-title.font-bold.text-2xl Hotel
    Button(@press="hi()" color='text-white' bgcolor='bg-green-500' size='large')
      .font-bold Hello
  .p-3.rounded-lg.shadow-md.bg-white.w-full.overflow-auto(class='h-[calc(100%-64px)]')
    div This is hotel page
</template>

<script setup lang="ts">
import Button from '@/components/shared/button/Button.vue'

const hi = () => console.log('HI')
</script>

<route lang="yaml">
meta:
  layout: dashboard
</route>
