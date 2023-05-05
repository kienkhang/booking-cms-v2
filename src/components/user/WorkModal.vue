<template lang="pug">
Modal(:show="show" @mask-click='closeModal()')
  .absolute.right-2.top-2 
    icon-ph:x-bold.w-4.h-4.cursor-pointer(@click='closeModal()')
  div(class='w-[600px] bg-white max-h-[500px] h-max rounded-10 p-8 mb-2 overflow-auto scroll-hide')
    .flex.flex-col.gap-3
      WorkList(v-for='i in 5' :key='i')
      WorkListAdd
</template>

<script setup lang="ts">
import Modal from '../shared/modal/Modal.vue'
import WorkList from './WorkList.vue'
import WorkListAdd from './WorkListAdd.vue'
defineProps<{
  show: boolean
  userId: string
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const closeModal = () => emit('update:show', false)
</script>

<style scoped></style>
