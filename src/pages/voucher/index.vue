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

// Get voucher
const { getVouchers } = useVoucherStore()
const { executeApi: fetchVouchers } = getVouchers(hotelId.value)

onMounted(() => {
  fetchVouchers()
})
</script>

<style scoped></style>
