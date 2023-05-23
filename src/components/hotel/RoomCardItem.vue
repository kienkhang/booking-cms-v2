<template lang="pug">
.flex.flex-col(class='gap-2.5 md:flex-row select-none mx-auto')
  div.rounded-10.overflow-hidden(class='w-56 h-[125px]')
    img(:src='overlayPhoto', alt="Hinh anh hotel", :srcset='roomPhotos[0] || defaultImage' class='object-cover cursor-pointer' @click='gotoDetails()')
  .flex.flex-col.justify-between(class='w-56 h-full md:w-72 md:h-[125px]')
    //- Price & action
    .flex.items-center.justify-between
      .flex.items-center.gap-2.scroll-hide.overflow-x-scroll
        span.px-2.py-1.bg-green-100.text-green-600.font-medium Ocean
        span.px-2.py-1.bg-green-100.text-green-600.font-medium City
        span.px-2.py-1.bg-green-100.text-green-600.font-medium Garden
        span.px-2.py-1.bg-green-100.text-green-600.font-medium Mountain
        span.px-2.py-1.bg-green-100.text-green-600.font-medium River
      RoomCardAction(:id='id')
    //- Title and description
    .title.font-semibold.text-lg(class='cursor-pointer' @click='gotoDetails()') {{name}}
    n-popover(width='trigger')
      template(#trigger)
        span.description.text-roman-silver.text-sm.line-clamp-none(class='md:line-clamp-2' v-html='description')
      span {{ description }}
    .flex.items-center.gap-2.mt-auto.text-sm
      .flex.items-center(class='gap-1')
        icon-custom-bath.flex-shrink-0
        span {{ bathroom_nums }} Baths
      .flex.items-center(class='gap-1')
        icon-custom-bed.flex-shrink-0
        span {{ bed_nums }} Beds
</template>

<script setup lang="ts">
import type { IRoom } from '@/dtos'
import RoomCardAction from './RoomCardAction.vue'
import { NPopover } from 'naive-ui'
import defaultImage from '@/assets/images/hotela.jpg'
import { Image2Array } from '@/utils/format'

const props = defineProps<{
  data: IRoom
}>()
// Desctructuring Props
const { name, description, bathroom_nums, bed_nums, id, photos } = toRefs(props.data)
// Convert photos from string to array
const roomPhotos = computed(() => Image2Array(photos.value))

// goto details page
const router = useRouter()
const gotoDetails = () => {
  router.push({ name: 'room-id', params: { id: props.data.id } })
}
// Card Photo
const overlayPhoto = computed(() => roomPhotos[0] || defaultImage)
</script>

<style scoped></style>
