<template lang="pug">
.flex.flex-col(class='gap-2.5 md:flex-row select-none mx-auto')
  div.rounded-10.overflow-hidden(class='w-56 h-[125px]')
    img(src="@/assets/images/hotela.jpg", alt="Hinh anh hotel", srcset="@/assets/images/hotela.jpg" class='object-cover cursor-pointer')
  .flex.flex-col.justify-between(class='w-56 h-full md:w-72 md:h-[125px]')
    //- Price & action
    .flex.items-center.justify-between
      .flex.items-center.gap-2.scroll-hide.overflow-x-scroll
        span.px-2.py-1.bg-green-100.text-green-600.font-medium Ocean
        span.px-2.py-1.bg-green-100.text-green-600.font-medium City
        span.px-2.py-1.bg-green-100.text-green-600.font-medium Garden
        span.px-2.py-1.bg-green-100.text-green-600.font-medium Mountain
        span.px-2.py-1.bg-green-100.text-green-600.font-medium River
      RoomCardAction
    //- Title and description
    .title.font-semibold.text-lg(class='cursor-pointer') Metro Jayakarta Hotel & Spa
    n-popover(width='trigger')
      template(#trigger)
        span.description.text-roman-silver.text-sm.line-clamp-none(class='md:line-clamp-2') {{ content }}
      span {{ content }}
    .flex.items-center.gap-2.mt-auto.text-sm
      .flex.items-center(class='gap-1')
        icon-custom-bath.flex-shrink-0
        span 2 Baths
      .flex.items-center(class='gap-1')
        icon-custom-bed.flex-shrink-0
        span 2 Beds
</template>

<script setup lang="ts">
import RoomCardAction from './RoomCardAction.vue'
import { NPopover } from 'naive-ui'
const content = ref(
  'Kích thước phòng: 38 m² / 409 ft². Không hút thuốc. Vòi hoa sen. Wifi miễn phí Wifi miễn phí Wifi miễn phí Wifi miễn phí'
)
</script>

<style scoped></style>
