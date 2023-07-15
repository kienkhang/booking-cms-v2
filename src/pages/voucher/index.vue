<template lang="pug">
div
  VoucherList 
</template>

<script setup lang="ts">
// Get hotel from store
const { hotelId } = useHotelStorage()
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

onMounted(() => {
  fetchVouchers()
})
</script>

<style scoped></style>
