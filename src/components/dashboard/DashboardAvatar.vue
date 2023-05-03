<template lang="pug">
div.flex.items-center(class='gap-2.5')
  //- Avatar
  NPopover(:show='show' trigger='click' @clickoutside="close" style='padding: 4px;')
    template(#trigger)
      .w-12.h-12.rounded-full.bg-orange-500.overflow-hidden.flex-shrink-0.cursor-pointer(@click='open()')
    div.select-none(@click='close()')
      .flex.items-center.gap-2.px-2.py-1.cursor-pointer(class='hover:bg-slate-50' @click='doLogout()')
        icon-ic:round-logout.w-4.h-4.flex-shrink-0
        span Đăng xuất
  //- Name & Position
  .flex.flex-col
    span.font-bold Kiện Khang
    span.text-gray-500 Front-end Developer
</template>

<script setup lang="ts">
// Router
const router = useRouter()
const show = ref(false)
const close = () => (show.value = false)
const open = () => (show.value = true)

const { logout } = useAuth()

const doLogout = async () => {
  await logout()
  router.push('/auth')
}
</script>

<style scoped></style>
