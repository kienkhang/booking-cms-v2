<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    .page-title.font-bold.text-2xl Hotel
    Button(@press="" color='text-white' bgcolor='bg-green-500' size='large')
      .font-bold Hello
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    span.text-sm.font-semibold Trở về
  .p-6.rounded-lg.shadow-md.bg-white.w-full.overflow-auto(class='h-[calc(100%-72px)]')
    .grid.grid-cols-1.gap-8(class='max-w-3xl mx-auto lg:grid-cols-2')
      //- .flex(class='flex flex-wrap')
      HotelCardItem(title='Thiết lập', description='Giúp bạn thiết lập thông tin về khách sạn của mình nhanh chóng')
        template(#icon)
          icon-color-hotel.w-28.h-28
      HotelCardItem(title='Phòng', description='Giúp bạn quản lý phòng của mình')
        template(#icon)
          icon-color-room.w-28.h-28
      HotelCardItem(title='Đêm nghỉ', description='Giúp bạn tạo ra một lịch biểu bán phòng của mình trên hệ thống của chúng tôi một cách nhanh chóng')
        template(#icon)
          icon-color-bed.w-28.h-28
      HotelCardItem(title='Voucher', description='Giúp bạn tạo ra một hệ thống mã giảm giá giành riêng cho khách hàng của mình')
        template(#icon)
          icon-color-voucher.w-28.h-28
</template>

<script setup lang="ts">
import HotelCardItem from '@/components/hotel/HotelCardItem.vue'
import Button from '@/components/shared/button/Button.vue'
</script>

<route lang="yaml">
meta:
  layout: dashboard
</route>
