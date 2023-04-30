<template lang="pug">
.flex.flex-col.rounded-10.overflow-hidden(class='w-56 h-max gap-2 mx-auto select-none bg-[#F9F9F9]')
  div(class='h-[125px] flex-shrink-0 overflow-hidden')
    img(src="@/assets/images/hotela.jpg", alt="Hinh anh hotel", srcset="@/assets/images/hotela.jpg" class='object-cover cursor-pointer')
    //- Title and description
  .flex.flex-col.gap-2.p-2.flex-shrink-0
    .title.font-semibold.text-base(class='cursor-pointer') Metro Jayakarta Hotel & Spa
    .flex.items-center.gap-1.mt-auto
      icon-ic:baseline-location-on.w-4.h-4
      span.text-xs 01 Võ Văn Ngân, Thủ Đức, TPHCM
</template>

<script setup lang="ts">
const {} = useHotelStorage()
</script>

<style scoped></style>
