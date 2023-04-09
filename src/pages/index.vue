<template lang="pug">
div
  | Hello, i am index Page
  button(type="submit" class='p-2 rounded-md bg-green-500 text-white' @click='n()') Goto Test
</template>

<script setup lang="ts">
const router = useRouter()
const n = () => {
  router.push('/test')
}
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: default
</route>
