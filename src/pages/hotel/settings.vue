<template lang="pug">
hotel-tabs
</template>

<script setup lang="ts">
import HotelTabs from '@/components/hotel/HotelTabs.vue'
const { getHotelLocalStore, setCurrentHotel } = useHotelsStore()
const { hotels } = useHotel()
onBeforeMount(() => {
  if (getHotelLocalStore()) {
    const { executeApi } = getHotelLocalStore()
    executeApi().then(() => {
      setCurrentHotel(hotels.value[0])
    })
  }
})
</script>
