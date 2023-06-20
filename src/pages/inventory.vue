<template lang="pug">
div.h-full.w-full
  .flex.items-center.justify-between.h-12
    NBreadcrumb
      NBreadcrumbItem
        router-link.page-title.font-bold.text-2xl(to='/hotel') Khách sạn
      NBreadcrumbItem
        .page-title.font-bold.text-2xl Lịch & Giá 
  .flex.items-center.mb-2.cursor-pointer.select-none.text-roman-silver.w-max
    icon-custom-left-arrow.h-4.w-auto
    router-link.text-sm.font-semibold(to='/hotel') Trở về
  .p-6.rounded-lg.shadow-md.bg-white.w-full.overflow-auto.space-y-6(class='h-[calc(100%-72px)]' ref='animate')
    //- Choose month and year to filter inventory (call get rooms api)
    InventorySelected
    //- Choose inventory mode (update rate or room night) (call get rateplans api follow room)
    InventoryMode
    //- Choose day to update (get inventory from store and render table)
    InventoryTable
</template>

<script setup lang="ts">
// Components
const InventoryMode = defineAsyncComponent(() => import('@/components/inventory/InventoryMode.vue'))
const InventorySelected = defineAsyncComponent(
  () => import('@/components/inventory/InventorySelected.vue')
)
const InventoryTable = defineAsyncComponent(
  () => import('@/components/inventory/InventoryTable.vue')
)

const router = useRouter()
const mess = useMessage()

// Call api
// FLOW ===> room -> after having room call { rateplan and inventories}

const { inventories } = useMutateInventory()
// Destructuring <list room> from room store, and fetch function
const { getRooms } = useRoomStore()
const { executeApi: fetchRoom } = getRooms()
// === destructuring list room
const { rooms } = useRoom()

// Before mount -> call api get room
onBeforeMount(async () => {
  // Get room first then set selected room
  await fetchRoom()
  if (rooms.value.length <= 0) {
    mess.error('Vui lòng tạo phòng')
    router.push('/hotel')
  }
  // reset inventory
  inventories.value = null
})
</script>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
</route>
