<template lang="pug">
div.flex.flex-col
  span.font-bold Full Path:  
    span.font-medium {{ route.fullPath }}
  span.font-bold Query String:  
    span.font-medium {{ route.query }}
  span.font-bold Params:  
    span.font-medium {{ route.params }}

</template>

<script setup lang="ts">
const route = useRoute()
</script>

<style scoped></style>

<route lang="yaml">
meta:
  layout: empty
</route>
