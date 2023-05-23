<template lang="pug">
RoomTabs
</template>

<script setup lang="ts">
const RoomTabs = defineAsyncComponent(() => import('@/components/room/RoomTabs.vue'))
// Import router hook
const route = useRoute()
// Get room id from url
const roomId = computed(() => route.params.id as string)
// Desctruct getRoomById function
const { getRoomById } = useRoomStore()
// Call API and Destruct Loading
const { executeApi } = getRoomById(roomId.value)
// Mounted -> call API
onMounted(() => {
  executeApi()
})
</script>

<style scoped></style>
