<template lang="pug">
.grid.grid-cols-1.gap-8(class='max-w-3xl mx-auto lg:grid-cols-2')
  //- .flex(class='flex flex-wrap')
  SettingCardItem(title='Thiết lập', description='Giúp bạn thiết lập thông tin chung và mô tả cho khách hàng thấy về khách sạn của mình nhanh chóng')
    template(#icon)
      icon-color-hotel.w-28.h-28
  SettingCardItem(title='Phòng', description='Giúp bạn thiết lập và quản lý các loại phòng trong khách sạn')
    template(#icon)
      icon-color-room.w-28.h-28
  SettingCardItem(title='Đêm nghỉ', description='Giúp bạn tạo ra một lịch biểu và giá bán theo ngày của từng phòng trên hệ thống của chúng tôi một cách nhanh chóng')
    template(#icon)
      icon-color-bed.w-28.h-28
  SettingCardItem(title='Voucher', description='Giúp bạn tạo ra một hệ thống mã giảm giá giành riêng cho khách hàng của bạn, giúp khách hàng có trải nghiệm tuyệt vời hơn')
    template(#icon)
      icon-color-voucher.w-28.h-28

</template>

<script setup lang="ts"></script>

<style scoped></style>
