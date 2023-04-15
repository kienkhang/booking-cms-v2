<template lang="pug">
.bg-white.w-full.h-full.px-3.py-6(class='hidden md:block')
  .flex.flex-col.gap-2
    SidebarItem(:activated='route.name==="index"' label='Tổng quan' page='index')
      template(#icon)
        icon-custom-app.w-6.h-6
    SidebarItem(:activated='route.name==="hotel"' label='Khách sạn' page='hotel')
      template(#icon)
        icon-custom-hotel.w-6.h-6
    SidebarItem(:activated='route.name==="checkin"' label='Checkin' page='checkin')
      template(#icon)
        icon-custom-checkin.w-6.h-6
    SidebarItem(:activated='route.name==="voucher"' label='Voucher' page='voucher')
      template(#icon)
        icon-custom-voucher.w-6.h-6
    SidebarItem(:activated='route.name==="cmsr"' label='Tỉ lệ hoa hồng' page='cmsr')
      template(#icon)
        icon-custom-rate.w-6.h-6
    SidebarItem(:activated='route.name==="report"' label='Thống kê' page='report')
      template(#icon)
        icon-custom-money.w-6.h-6
    SidebarItem(:activated='route.name==="test"' label='Upload file' page='test')
      template(#icon)
        icon-custom-error.w-6.h-6

</template>

<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
const route = useRoute()
</script>

<style scoped></style>
