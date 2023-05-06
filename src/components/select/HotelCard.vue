<template lang="pug">
.flex.flex-col.rounded-10.overflow-hidden(class='w-56 h-max gap-2 mx-auto select-none bg-[#F9F9F9]')
  div(class='h-[125px] flex-shrink-0 overflow-hidden' @click='selectHotel()')
    img(:src='overlayPhoto', alt="Hinh anh hotel", :srcset='overlayPhoto' class='object-cover cursor-pointer')
    //- Title and description
  .flex.flex-col.gap-2.p-2.flex-shrink-0
    .title.font-semibold.text-base(class='cursor-pointer' @click='selectHotel()') {{ hotel.name }}
    .flex.items-center.gap-1.mt-auto
      icon-ic:baseline-location-on.w-4.h-4
      span.text-xs {{hotel.raw_address}}
</template>

<script setup lang="ts">
import type { IHotel } from '@/dtos'
import emptyPhoto from '@/assets/images/hotela.jpg'

const router = useRouter()

const { hotelId } = useHotelStorage()

const props = defineProps<{
  hotel: IHotel
}>()

const overlayPhoto = computed(() => {
  if (props.hotel.photos) {
    const photosJSON = JSON.parse(props.hotel.photos)
    return photosJSON[0]
  } else {
    return emptyPhoto
  }
})

const selectHotel = () => {
  hotelId.value = props.hotel.id
  router.push('/')
}
</script>

<style scoped></style>
