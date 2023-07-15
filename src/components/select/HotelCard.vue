<template lang="pug">
.flex.flex-col.rounded-10.overflow-hidden(class='w-56 h-[225px] gap-2 mx-auto select-none bg-[#F9F9F9]')
  div(class='h-[125px] flex-shrink-0 overflow-hidden' @click='selectHotel()')
    img(:src='overlayPhoto', alt="Hinh anh hotel", :srcset='overlayPhoto' class='object-cover cursor-pointer')
    //- Title and description
  .flex.flex-col.gap-2.p-2(class='flex-1')
    .title.font-semibold.text-base(class='cursor-pointer' @click='selectHotel()') {{ hotel.name }}
    .flex.items-center.gap-1(class='mt-auto')
      icon-ic:baseline-location-on.w-4.h-4.flex-shrink-0
      n-popover(width='trigger')
        template(#trigger)
          span.text-xs.desc.text-roman-silver.mt-auto.line-clamp-2 {{hotel.raw_address}}
        span.text-xs {{hotel.raw_address}}
</template>

<script setup lang="ts">
import type { IHotel } from '@/dtos'
import emptyPhoto from '@/assets/images/hotela.jpg'
import { Image2Array } from '@/utils/format'

const props = defineProps<{
  hotel: IHotel
}>()

const router = useRouter()
const route = useRoute()
const from = route.redirectedFrom

const { hotelId } = useHotelStorage()

const overlayPhoto = computed(() => {
  if (props.hotel.hotel_photos) {
    const photos = Image2Array(props.hotel.hotel_photos)
    return photos[0]
  } else {
    return emptyPhoto
  }
})

const selectHotel = () => {
  if (from && from.name !== 'select') {
    hotelId.value = props.hotel.id
    router.push({
      name: from.name,
      params: from.params,
      query: from.query
    })
  } else {
    router.push({
      name: 'hotel'
    })
  }
}
</script>

<style scoped></style>
