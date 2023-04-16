<template lang="pug">
.grid.grid-cols-1.gap-8(class='max-w-3xl mx-auto lg:grid-cols-2')
  //- .flex(class='flex flex-wrap')
  SettingCardItem(title='Thiết lập' path='/hotel/config' description='Giúp bạn thiết lập thông tin chung và mô tả cho khách hàng thấy về khách sạn của mình nhanh chóng' @goto='goto("/hotel/config")')
    template(#icon)
      icon-color-hotel.w-28.h-28.cursor-pointer(@click='goto("/hotel/config")')
  SettingCardItem(title='Phòng' path='/room' description='Giúp bạn thiết lập và quản lý các loại phòng trong khách sạn'  @goto='goto("/room")')
    template(#icon)
      icon-color-room.w-28.h-28.cursor-pointer(@click='goto("/room")')
  SettingCardItem(title='Đêm nghỉ' path='/inventory' description='Giúp bạn tạo ra một lịch biểu và giá bán theo ngày của từng phòng trên hệ thống của chúng tôi một cách nhanh chóng'  @goto='goto("/inventory")')
    template(#icon)
      icon-color-bed.w-28.h-28.cursor-pointer(@click='goto("/inventory")')
  SettingCardItem(title='Voucher' path='/voucher' description='Giúp bạn tạo ra một hệ thống mã giảm giá giành riêng cho khách hàng của bạn, giúp khách hàng có trải nghiệm tuyệt vời hơn'  @goto='goto("/inventory")')
    template(#icon)
      icon-color-voucher.w-28.h-28.cursor-pointer(@click='goto("/voucher")')

</template>

<script setup lang="ts">
const router = useRouter()

const goto = (path: string) => {
  router.push({ path })
}
</script>

<style scoped></style>
