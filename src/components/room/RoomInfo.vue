<template lang="pug">
div Thông tin chi tiết của room đổ ra theo thứ tự là Tên, thông tin, số phòng ngủ, trẻ em, view, tiện ích, hình ảnh {{ roomId }}
  
</template>

<script setup lang="ts">
const route = useRoute()
const roomId = computed(() => route.params?.id)
</script>

<style scoped></style>