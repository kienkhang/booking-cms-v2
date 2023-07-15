<template lang="pug">
div.grid.grid-cols-3.gap-5
  .voucher-item(v-for='voucher in vouchers' :key='voucher.id')
    VoucherItem(:voucher='voucher')


</template>

<script setup lang="ts">
import VoucherItem from './VoucherItem.vue'

const { vouchers } = storeToRefs(useVoucherStore())
</script>

<style scoped></style>
