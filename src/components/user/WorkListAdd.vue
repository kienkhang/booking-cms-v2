<template lang="pug">
FormKit(type='form' :actions='false' @submit='doAdd')
  .flex.items-center.gap-2
    FormKit(type='text' name='Mã khách sạn' placeholder='Nhập mã khách sạn' validation='required' wrapper-class='w-full' outer-class='w-full')
    FormKit(type='submit') Thêm
</template>

<script setup lang="ts">
const doAdd = () => {
  console.log('Add success')
}
</script>

<style scoped></style>
