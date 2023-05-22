<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    NBreadcrumb
      NBreadcrumbItem
        router-link.page-title.font-bold.text-2xl(to='/hotel') Khách sạn
      NBreadcrumbItem
        .page-title.font-bold.text-2xl Phòng
    Button(@press="open" color='text-white' bgcolor='bg-purple-600' size='medium' v-if='addRoomAble')
      icon-ic:round-plus.w-6.h-6.flex-shrink-0
      .font-bold Thêm phòng
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    span.text-sm.font-semibold(@click='redirect()') Trở về
  .p-6.rounded-lg.shadow-md.bg-white.w-full.overflow-auto(class='h-[calc(100%-72px)]' ref='animate')
    router-view
  RoomModal(v-model:show='show')
</template>

<script setup lang="ts">
import { useAutoAnimate } from '@formkit/auto-animate/vue'
// Components
const RoomModal = defineAsyncComponent(() => import('@/components/shared/modal/RoomModal.vue'))

// Route & Router
const route = useRoute()
const router = useRouter()
const addRoomAble = computed(() => route.name === 'room')

const redirect = () => {
  switch (route.name) {
    case 'room':
      router.push('/hotel')
      break
    case 'room-id':
      router.push('/room')
      break
    case 'room-id-edit':
      router.push('/room')
      break

    default:
      break
  }
}

// Add room modal
const show = ref(false)
const open = () => (show.value = true)

// Animate screen
const [animate] = useAutoAnimate({})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
</route>
