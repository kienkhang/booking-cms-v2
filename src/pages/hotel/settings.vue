<template lang="pug">
hotel-tabs
</template>

<script setup lang="ts">
import HotelTabs from '@/components/hotel/HotelTabs.vue'
const route = useRoute()
console.log('🐔🦢 ~ route:', { ...route })
</script>

<style scoped></style>

<route lang="yaml">
meta:
  crud: edit-hotel
</route>
