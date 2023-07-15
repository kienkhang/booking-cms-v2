<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    NBreadcrumb
      NBreadcrumbItem
        .page-title.font-bold.text-2xl Hotel
    Button(color='text-white' bgcolor='bg-orange-600' size='medium' @click='gotoSelect()')
      icon-ic:round-keyboard-return.w-6.h-6.flex-shrink-0
      .font-bold Chọn khách sạn
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    router-link.text-sm.font-semibold(to='/hotel') Trở về
  .p-6.rounded-lg.shadow-md.bg-white.w-full.overflow-auto.scrollbar-gradient(class='h-[calc(100%-72px)]' ref='animate')
    router-view
</template>

<script setup lang="ts">
import { useAutoAnimate } from '@formkit/auto-animate/vue'
// Components
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'

// Route & Router
const router = useRouter()
const gotoSelect = () => router.push({ name: 'select' })

// Animate screen
const [animate] = useAutoAnimate({})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
  requiredHotel: true
</route>
