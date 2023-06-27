<template lang="pug">
.flex.items-center.justify-between.gap-2(v-auto-animate class='px-2 transition-all rounded hover:bg-cultured')
  .hotel-info
    span.text-base.font-semibold(class='line-clamp-1') {{ hotel?.name }}
    span.text-xs.text-roman-silver.font-medium(class='line-clamp-1') {{ hotel?.id }}
  .rounded-full.w-8.h-8.flex.justify-center.items-center(:class='["transition-all duration-150 bg-transparent hover:bg-red-200/50"]' v-if='!isConfirming' )
    icon-mdi:trash-can-outline.flex-shrink-0.w-5.h-5.text-red-600.cursor-pointer(
      @click='isConfirming = true' 
      )

  .flex.items-center.gap-3(v-if='isConfirming')
    Button(size="small" type='button' class='text-white bg-red-500' @click='isConfirming = false' v-if='isConfirming') Huỷ bỏ
    Button(size="small" type='button' name='submit-update-cmsr' :class='["text-white bg-green-crayola",{"pointer-events-none cursor-not-allowed":isLoading}]' @press='doDelete' v-if='isConfirming')
      icon-custom-load.w-4.h-4.animate-spin(v-if='isLoading')
      span(v-else) Cập nhật
</template>

<script setup lang="ts">
import type { IHotel } from '@/dtos'
import Button from '../shared/button/Button.vue'

const props = defineProps<{
  userId: string
  hotel: IHotel
}>()
// DELETE HANDLER
const { deleteWork } = useWork()
const form = computed(() => ({
  user_id: props.userId,
  hotel_id: props.hotel.id
}))

const { executeApi, isLoading } = deleteWork(form)
const isConfirming = ref(false)
async function doDelete() {
  await executeApi()
}
</script>

<style scoped></style>
