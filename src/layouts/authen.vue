<template lang="pug">
.grid.h-screen.w-screen.bg-gray-50(class='md:grid-cols-2')
  .description.hidden(class='md:block')
  .shadow-md.bg-white.mx-12.my-12.rounded-lg
    .flex.flex-col.justify-center.items-center.p-3.mt-6
      router-view

</template>

<script setup lang="ts"></script>

<style scoped lang="stylus">
.description
  background url('https://images.unsplash.com/photo-1665743369277-d5b4dd7131c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80') no-repeat content-box
</style>
