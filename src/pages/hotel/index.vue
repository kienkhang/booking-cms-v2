<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    .page-title.font-bold.text-2xl Hotel
    Button(@press="" color='text-white' bgcolor='bg-purple-600' size='medium')
      icon-ic:round-plus.w-6.h-6.flex-shrink-0
      .font-bold Add hotel
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    RouterLink.text-sm.font-semibold(to='/hotel') Trở về
  .p-6.rounded-lg.shadow-md.bg-white.w-full.overflow-auto(class='h-[calc(100%-72px)]' ref='animate')
    SettingScreen(v-if='screen==="main"')
    RoomScreen(v-if='screen==="room"')

</template>

<script setup lang="ts">
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import useSettingsState from '@/composables/room/useSettingsState'
const SettingScreen = defineAsyncComponent(() => import('@/components/hotel/SettingScreen.vue'))
const RoomScreen = defineAsyncComponent(() => import('@/components/hotel/RoomScreen.vue'))

const { screen } = storeToRefs(useSettingsState())

// Animate screen
const [animate] = useAutoAnimate({})
</script>

<route lang="yaml">
meta:
  layout: dashboard
</route>
