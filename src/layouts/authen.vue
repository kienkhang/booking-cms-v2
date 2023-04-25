<template lang="pug">
.grid.h-screen.w-screen.bg-gray-50(class='md:grid-cols-2')
  .description.hidden(class='md:block')
  .flex.flex-col.gap-2.mx-12.my-12
    .flex.items-center.cursor-pointer(@click='direct()')
      icon-ic:round-keyboard-arrow-left.w-4.h-4
      .font-medium.text-dark-theme {{navigateLabel}}
    .shadow-md.bg-white.rounded-lg
      .flex.flex-col.justify-center.items-center.p-3.mt-6
        router-view

</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const navigateLabel = computed(() => (route.name !== 'auth' ? 'Trở về' : 'Quay lại trang chủ'))

const direct = () => {
  if (route.name !== 'auth') {
    router.push({ name: 'auth' })
  } else {
    router.push('/')
  }
}
</script>

<style scoped lang="stylus">
.description
  background url('https://images.unsplash.com/photo-1665743369277-d5b4dd7131c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80') no-repeat content-box
</style>
