<template lang="pug">
div
  VoucherList 
</template>

<script setup lang="ts">
// Get hotel from store
const { currentHotel: hotel } = storeToRefs(useHotelsStore())
const hotelId = computed(() => {
  if (hotel.value) {
    return hotel.value.id
  }
})
// Whenever exist hotelid -> set hotel id
// whenever(hotelId, () => {
//   form.value.hotel_id = hotelId.value
// })

// Gedt voucher
const { getVouchers } = useVoucherStore()

async function fetchVouchers() {
  const { executeApi } = getVouchers(hotelId.value)

  await executeApi()
}

watch(hotelId, () => {
  if (hotelId.value) {
    fetchVouchers()
  }
})
</script>

<style scoped></style>
