<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    NBreadcrumb
      NBreadcrumbItem
        .page-title.font-bold.text-2xl Người dùng
  //- .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
  //-   icon-custom-left-arrow.h-4.w-auto
  //-   router-link.text-sm.font-semibold(to='/hotel') Trở về
  .p-6.rounded-lg.shadow-md.bg-white.w-full.overflow-auto.scrollbar-gradient(class='h-[calc(100%-72px)]' ref='animate')
    UsersTable

</template>

<script setup lang="ts">
import UsersTable from '@/components/user/UsersTable.vue'

const router = useRouter()
const { role } = storeToRefs(useAccountsStore())
onBeforeMount(() => {
  if (!['ADMIN', 'SUPERADMIN'].includes(role.value)) {
    router.push('/')
  }
})
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
</route>
