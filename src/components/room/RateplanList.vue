<template lang="pug">
.flex.items-center.flex-row-reverse
  Button(@press="" color='text-white' bgcolor='bg-green-crayola' size='small')
    icon-ic:round-plus.w-6.h-6.flex-shrink-0
    .font-bold Thêm

</template>

<script setup lang="ts">
const show = ref(false)
</script>

<style scoped></style>
