<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    .page-title.font-bold.text-2xl Hotel
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    span.text-sm.font-semibold Trở về
  .p-3.rounded-lg.shadow-md.bg-white.w-full.overflow-auto(class='h-[calc(100%-72px)]')
    div This is hotel page
</template>

<script setup lang="ts">
const router = useRouter()

onMounted(() => router.push('/report'))
</script>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
</route>
