<template lang="pug">
article.flex.items-center.gap-3(class='h-[150px] max-w-[500px] w-full select-none')
  //- Image here
  div.h-full(class='max-w-[250px] rounded-10 flex-shrink-0 overflow-hidden')
    img(src='@/assets/images/home.jpg', alt="Hotel room in Viet Nam", srcset="@/assets/images/home.jpg")
  //- Content here
  aside.flex.flex-col.justify-between(class='flex-1 gap-1 min-w-[200px]')
    //- Price & action
    .flex.items-center.justify-between
      span.rounded-md.bg-green-50.text-green-600.px-2.font-semibold.text-center.text-base 1.000.000đ
      icon-ic:outline-more-vert.w-5.h-5.cursor-pointer
    //- Name & description
    .font-bold Star Sun Hotel & Apartment
    .text-roman-silver.line-clamp-2 2 giường đơn. Kích thước phòng: 32 m² / 344 ft². Cảnh quan thành phố. Không hút thuốc. Vòi hoa sen. Wifi miễn phí
    //- Bed, Bath
    .flex.items-center.gap-3.text-xs.font-semibold
      .flex.items-center.gap-1
        icon-custom-bed.w-4.h-4 
        span 6 Beds
      .flex.items-center.gap-1
        icon-custom-bath.w-4.h-4 
        span 2 Beds


</template>

<script setup lang="ts"></script>

<style scoped></style>
